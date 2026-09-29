#!/usr/bin/env bash
# Build language-portal with Cloud Build and deploy it to Cloud Run.
# Adapted from the retired english-coach/infra/deploy.sh. This script and ./terraform are two alternative
# ways to manage the same service — use one of them consistently.
#
# Usage: infra/language-portal/deploy.sh [image-tag]
# Config: copy deploy.env.example to deploy.env (git-ignored) and adjust.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
APP_DIR="${REPO_ROOT}/language-portal"
ENV_FILE="${SCRIPT_DIR}/deploy.env"

if [[ -f "${ENV_FILE}" ]]; then
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
fi

PROJECT_ID="${PROJECT_ID:-my-personal-data-430607}"
REGION="${REGION:-asia-south1}"
SERVICE_NAME="${SERVICE_NAME:-language-portal}"
REPO_NAME="${REPO_NAME:-language-portal}"
IMAGE_NAME="${IMAGE_NAME:-language-portal}"
SERVICE_ACCOUNT_NAME="${SERVICE_ACCOUNT_NAME:-language-portal-runtime}"
GEMINI_MODEL="${GEMINI_MODEL:-gemini-3.1-flash-lite}"
GEMINI_LIVE_MODEL="${GEMINI_LIVE_MODEL:-models/gemini-3.1-flash-live-preview}"
USE_ACCESS_CODE="${USE_ACCESS_CODE:-false}"
EXTRA_ENV_VARS="${EXTRA_ENV_VARS:-}"
TAG="${1:-$(date +%Y%m%d-%H%M%S)}"
IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}:${TAG}"
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

if [[ ! -f "${APP_DIR}/Dockerfile" ]]; then
  echo "Cannot find ${APP_DIR}/Dockerfile — run this script from inside the repository." >&2
  exit 1
fi

ACTIVE_ACCOUNT="$(gcloud config get-value account 2>/dev/null || true)"
echo "→ gcloud user : ${ACTIVE_ACCOUNT:-<none>}"
if [[ -n "${EXPECTED_GCLOUD_ACCOUNT:-}" && "${ACTIVE_ACCOUNT}" != "${EXPECTED_GCLOUD_ACCOUNT}" ]]; then
  echo "Active gcloud account is '${ACTIVE_ACCOUNT}', expected '${EXPECTED_GCLOUD_ACCOUNT}'." >&2
  echo "Run: gcloud config set account ${EXPECTED_GCLOUD_ACCOUNT}" >&2
  exit 1
fi
echo "→ Project    : ${PROJECT_ID}"
echo "→ Region     : ${REGION}"
echo "→ Service    : ${SERVICE_NAME}"
echo "→ Image      : ${IMAGE}"
echo "→ Text model : ${GEMINI_MODEL}"
echo "→ Live model : ${GEMINI_LIVE_MODEL}"
echo "→ Access code: ${USE_ACCESS_CODE}"
echo ""

gcloud config set project "${PROJECT_ID}" >/dev/null

echo "→ Enabling required GCP APIs..."
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com \
  iam.googleapis.com

echo "→ Creating Artifact Registry repo (if needed)..."
gcloud artifacts repositories describe "${REPO_NAME}" --location="${REGION}" >/dev/null 2>&1 || \
  gcloud artifacts repositories create "${REPO_NAME}" \
    --repository-format=docker \
    --location="${REGION}" \
    --description="Language Portal images"

ensure_secret() {
  local name="$1"
  if ! gcloud secrets describe "${name}" --project="${PROJECT_ID}" >/dev/null 2>&1; then
    printf "replace-me" | gcloud secrets create "${name}" --project="${PROJECT_ID}" --data-file=-
    echo "  ⚠  Secret ${name} created with a placeholder — set the real value before using the app:"
    echo "     printf '%s' 'REAL_VALUE' | gcloud secrets versions add ${name} --data-file=-"
  fi
}

echo "→ Ensuring secrets exist..."
ensure_secret GEMINI_API_KEY
SECRETS="GEMINI_API_KEY=GEMINI_API_KEY:latest"
if [[ "${USE_ACCESS_CODE}" == "true" ]]; then
  ensure_secret PRACTICE_ACCESS_CODE
  SECRETS="${SECRETS},PRACTICE_ACCESS_CODE=PRACTICE_ACCESS_CODE:latest"
fi

echo "→ Creating service account (if needed)..."
gcloud iam service-accounts describe "${SERVICE_ACCOUNT_EMAIL}" --project="${PROJECT_ID}" >/dev/null 2>&1 || \
  gcloud iam service-accounts create "${SERVICE_ACCOUNT_NAME}" \
    --project="${PROJECT_ID}" \
    --display-name="Language Portal Cloud Run runtime"

echo "→ Waiting for service account to propagate..."
for attempt in {1..12}; do
  if gcloud iam service-accounts describe "${SERVICE_ACCOUNT_EMAIL}" --project="${PROJECT_ID}" >/dev/null 2>&1; then
    break
  fi
  if [[ "${attempt}" == "12" ]]; then
    echo "Service account not visible after 60s — retry deploy in a minute." >&2
    exit 1
  fi
  sleep 5
done

echo "→ Granting Secret Manager access to the service account..."
for secret in GEMINI_API_KEY $([[ "${USE_ACCESS_CODE}" == "true" ]] && echo PRACTICE_ACCESS_CODE); do
  gcloud secrets add-iam-policy-binding "${secret}" \
    --project="${PROJECT_ID}" \
    --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
    --role="roles/secretmanager.secretAccessor" >/dev/null
done

echo "→ Building and pushing the image via Cloud Build (Docusaurus site + server bundle)..."
gcloud builds submit --project="${PROJECT_ID}" --tag "${IMAGE}" "${APP_DIR}"

ENV_VARS="NODE_ENV=production,GEMINI_MODEL=${GEMINI_MODEL},GEMINI_LIVE_MODEL=${GEMINI_LIVE_MODEL}"
if [[ -n "${EXTRA_ENV_VARS}" ]]; then
  ENV_VARS="${ENV_VARS},${EXTRA_ENV_VARS}"
fi

echo "→ Deploying to Cloud Run..."
# --timeout=3600 and --session-affinity keep voice-practice WebSockets alive and on one instance.
gcloud run deploy "${SERVICE_NAME}" \
  --image="${IMAGE}" \
  --region="${REGION}" \
  --project="${PROJECT_ID}" \
  --platform=managed \
  --service-account="${SERVICE_ACCOUNT_EMAIL}" \
  --allow-unauthenticated \
  --min-instances=0 \
  --max-instances=2 \
  --memory=512Mi \
  --cpu=1 \
  --timeout=3600 \
  --session-affinity \
  --port=8080 \
  --set-env-vars="${ENV_VARS}" \
  --set-secrets="${SECRETS}"

SERVICE_URL="$(gcloud run services describe "${SERVICE_NAME}" \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --format='value(status.url)')"

echo ""
echo "✓ Deploy complete!"
printf 'Service URL : %s\n' "${SERVICE_URL}"
printf 'Image URI   : %s\n' "${IMAGE}"
printf 'Health      : %s/healthz\n' "${SERVICE_URL}"
