output "service_url" {
  value = google_cloud_run_v2_service.service.uri
}

output "artifact_registry_repo" {
  value = google_artifact_registry_repository.repo.name
}

output "runtime_service_account" {
  value = google_service_account.runtime.email
}
