variable "project_id" {
  type        = string
  description = "GCP project that hosts the Cloud Run service."
  default     = "my-personal-data-430607"
}

variable "region" {
  type    = string
  default = "asia-south1"
}

variable "service_name" {
  type    = string
  default = "language-portal"
}

variable "repo_name" {
  type        = string
  description = "Artifact Registry Docker repository name."
  default     = "language-portal"
}

variable "image" {
  type        = string
  description = "Container image URI to deploy (build it with infra/language-portal/deploy.sh or `gcloud builds submit`)."
}

variable "gemini_model" {
  type        = string
  description = "Text model for /api/chat and /api/transcribe."
  default     = "gemini-3.1-flash-lite"
}

variable "gemini_live_model" {
  type        = string
  description = "Gemini Live model for the /api/audio-bridge voice sessions."
  default     = "models/gemini-3.1-flash-live-preview"
}

variable "enable_access_code" {
  type        = bool
  description = "Create a PRACTICE_ACCESS_CODE secret and require it for AI practice. Recommended for a public URL."
  default     = false
}

variable "max_instances" {
  type    = number
  default = 2
}

variable "memory" {
  type    = string
  default = "512Mi"
}

variable "extra_env" {
  type        = map(string)
  description = "Optional extra plain env vars, e.g. { CHAT_REQUESTS_PER_MINUTE = \"20\", LIVE_MAX_SESSION_SECONDS = \"600\" }."
  default     = {}
}
