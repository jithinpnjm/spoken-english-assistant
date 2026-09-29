# Cloud Run deployment for language-portal (Docusaurus site + Node practice server).
# Adapted from the retired english-coach/infra/terraform. Changes: new service name, no Firestore API or
# datastore role (the new server is stateless), the unused APP_PASSWORD secret is gone, secret access is
# granted per secret instead of project-wide, the request timeout covers long WebSocket voice sessions,
# and an optional PRACTICE_ACCESS_CODE secret can gate the AI practice API.

terraform {
  required_version = ">= 1.5"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.40"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

locals {
  apis = [
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "secretmanager.googleapis.com",
    "iam.googleapis.com",
  ]
  secret_ids = concat(["GEMINI_API_KEY"], var.enable_access_code ? ["PRACTICE_ACCESS_CODE"] : [])
}

resource "google_project_service" "apis" {
  for_each           = toset(local.apis)
  service            = each.value
  disable_on_destroy = false
}

resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = var.repo_name
  format        = "DOCKER"
  description   = "Language Portal images"
  depends_on    = [google_project_service.apis]
}

resource "google_service_account" "runtime" {
  account_id   = "${var.service_name}-runtime"
  display_name = "Language Portal Cloud Run runtime"
}

# Secret *containers* only. Add the values out of band so they never land in Terraform state:
#   printf '%s' "$KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-
resource "google_secret_manager_secret" "secrets" {
  for_each  = toset(local.secret_ids)
  secret_id = each.value
  replication {
    auto {}
  }
  depends_on = [google_project_service.apis]
}

resource "google_secret_manager_secret_iam_member" "runtime_access" {
  for_each  = google_secret_manager_secret.secrets
  secret_id = each.value.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.runtime.email}"
}

resource "google_cloud_run_v2_service" "service" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = google_service_account.runtime.email
    # Voice practice keeps a WebSocket open for up to LIVE_MAX_SESSION_SECONDS (default 600s);
    # Cloud Run closes any request, including WebSockets, at this timeout.
    timeout          = "3600s"
    session_affinity = true

    scaling {
      min_instance_count = 0
      max_instance_count = var.max_instances
    }

    containers {
      image = var.image
      ports {
        container_port = 8080
      }
      resources {
        limits = {
          cpu    = "1"
          memory = var.memory
        }
      }

      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name  = "GEMINI_MODEL"
        value = var.gemini_model
      }
      env {
        name  = "GEMINI_LIVE_MODEL"
        value = var.gemini_live_model
      }
      dynamic "env" {
        for_each = var.extra_env
        content {
          name  = env.key
          value = env.value
        }
      }
      dynamic "env" {
        for_each = toset(local.secret_ids)
        content {
          name = env.value
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.secrets[env.value].secret_id
              version = "latest"
            }
          }
        }
      }

      startup_probe {
        http_get {
          path = "/healthz"
        }
      }
    }
  }

  depends_on = [google_project_service.apis, google_secret_manager_secret_iam_member.runtime_access]
}

# The site is public. The AI practice API is protected by rate limits, origin checks and (optionally)
# PRACTICE_ACCESS_CODE inside the app — not by Cloud Run IAM.
resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.service.name
  location = google_cloud_run_v2_service.service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
