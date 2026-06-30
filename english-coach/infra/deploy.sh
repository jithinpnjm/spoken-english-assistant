#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
ENV_FILE="${SCRIPT_DIR}/deploy.env"

if [[ -f "${ENV_FILE}" ]]; then
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
fi

PROJECT_ID="${PROJECT_ID:-my-personal-data-430607}"
REGION="${REGION:-asia-south1}"
SERVICE_NAME="${SERVICE_NAME:-english-coach}"
REPO_NAME="${REPO_NAME:-english-coach}"
IMAGE_NAME="${IMAGE_NAME:-english-coach}"
SERVICE_ACCOUNT_NAME="${SERVICE_ACCOUNT_NAME:-english-coach-runtime}"
GEMINI_MODEL="${GEMINI_MODEL:-gemini-3.1-flash-lite}"
GEMINI_LIVE_MODEL="${GEMINI_LIVE_MODEL:-models/gemini-3.1-flash-live-preview}"
TAG="${1:-$(date +%Y%m%d-%H%M%S)}"
IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}:${TAG}"
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

echo "→ Project    : ${PROJECT_ID}"
echo "→ Region     : ${REGION}"
echo "→ Service    : ${SERVICE_NAME}"
echo "→ Image      : ${IMAGE}"
echo "→ Text model : ${GEMINI_MODEL}"
echo "→ Live model : ${GEMINI_LIVE_MODEL}"
echo ""

gcloud config set project "${PROJECT_ID}"

echo "→ Enabling required GCP APIs..."
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com \
  firestore.googleapis.com \
  identitytoolkit.googleapis.com \
  iam.googleapis.com

echo "→ Creating Artifact Registry repo (if needed)..."
gcloud artifacts repositories describe "${REPO_NAME}" --location="${REGION}" >/dev/null 2>&1 || \
  gcloud artifacts repositories create "${REPO_NAME}" \
    --repository-format=docker \
    --location="${REGION}" \
    --description="English Coach images"

echo "→ Creating GEMINI_API_KEY secret (if needed)..."
if ! gcloud secrets describe GEMINI_API_KEY --project="${PROJECT_ID}" >/dev/null 2>&1; then
  printf "replace-me" | gcloud secrets create GEMINI_API_KEY \
    --project="${PROJECT_ID}" \
    --data-file=-
  echo "  ⚠  Secret GEMINI_API_KEY created with placeholder — update it before the app will work:"
  echo "     gcloud secrets versions add GEMINI_API_KEY --data-file=- <<< 'YOUR_REAL_KEY'"
fi

echo "→ Creating service account (if needed)..."
gcloud iam service-accounts describe "${SERVICE_ACCOUNT_EMAIL}" --project="${PROJECT_ID}" >/dev/null 2>&1 || \
  gcloud iam service-accounts create "${SERVICE_ACCOUNT_NAME}" \
    --project="${PROJECT_ID}" \
    --display-name="English Coach Cloud Run runtime"

echo "→ Waiting for service account to propagate..."
for attempt in {1..12}; do
  if gcloud iam service-accounts describe "${SERVICE_ACCOUNT_EMAIL}" --project="${PROJECT_ID}" >/dev/null 2>&1; then
    break
  fi
  if [[ "${attempt}" == "12" ]]; then
    echo "Service account not visible after 60s — retry deploy in a minute."
    exit 1
  fi
  sleep 5
done

echo "→ Granting Secret Manager access to service account..."
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --project="${PROJECT_ID}" \
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role="roles/secretmanager.secretAccessor" >/dev/null

echo "→ Granting Firestore access to service account..."
gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
  --role="roles/datastore.user" >/dev/null

echo "→ Building and pushing Docker image via Cloud Build..."
gcloud builds submit --project="${PROJECT_ID}" --tag "${IMAGE}" "${APP_DIR}"

echo "→ Deploying to Cloud Run..."
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
  --port=3000 \
  --set-env-vars="NODE_ENV=production,GEMINI_MODEL=${GEMINI_MODEL},GEMINI_LIVE_MODEL=${GEMINI_LIVE_MODEL}" \
  --set-secrets="GEMINI_API_KEY=GEMINI_API_KEY:latest"

SERVICE_URL="$(gcloud run services describe "${SERVICE_NAME}" \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --format='value(status.url)')"

echo ""
echo "✓ Deploy complete!"
printf 'Service URL : %s\n' "${SERVICE_URL}"
printf 'Image URI   : %s\n' "${IMAGE}"
