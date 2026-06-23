variable "project_id" {
  type    = string
  default = "my-personal-data-430607"
}

variable "region" {
  type    = string
  default = "asia-south1"
}

variable "service_name" {
  type    = string
  default = "english-coach"
}

variable "repo_name" {
  type    = string
  default = "english-coach"
}

variable "gemini_model" {
  type    = string
  default = "gemini-3.1-flash-lite"
}

variable "gemini_live_model" {
  type    = string
  default = "gemini-3.1-flash-live-preview"
}

variable "image" {
  type        = string
  description = "Container image URI to deploy."
}
