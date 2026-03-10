#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
DOCKER_DIR="${PROJECT_DIR}/chat-docker"
COMPOSE_FILE="${DOCKER_DIR}/docker-compose.yml"
ENV_FILE="${DOCKER_DIR}/.env"
ENV_EXAMPLE_FILE="${DOCKER_DIR}/.env.example"

log_info() {
  printf '[INFO] %s\n' "$1"
}

log_warn() {
  printf '[WARN] %s\n' "$1"
}

wait_for_http() {
  local url="$1"
  local label="$2"
  local attempts=20
  local delay_seconds=2
  local attempt=1

  if ! command -v curl >/dev/null 2>&1; then
    log_warn "curl not available. Skipping ${label} endpoint check."
    return 0
  fi

  while (( attempt <= attempts )); do
    if curl -fsS "${url}" >/dev/null 2>&1; then
      log_info "${label} is reachable at ${url}."
      return 0
    fi

    sleep "${delay_seconds}"
    attempt=$((attempt + 1))
  done

  log_warn "${label} did not become reachable at ${url} after $((attempts * delay_seconds)) seconds."
  return 1
}

if [[ ! -f "${ENV_FILE}" ]]; then
  cp "${ENV_EXAMPLE_FILE}" "${ENV_FILE}"
  log_warn "Missing .env file. Created ${ENV_FILE} from .env.example."
fi

log_info "Running diagnostics before startup."
"${SCRIPT_DIR}/doctor.sh"

log_info "Starting Sprint 1 stack (chat-frontend, chat-core-service, chat-postgres, chat-n8n)."
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d

log_info "Current container status:"
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" ps

# Load environment values for endpoint checks
# shellcheck disable=SC1090
set -a && source "${ENV_FILE}" && set +a

wait_for_http "http://localhost:${CORE_SERVICE_PORT:-4012}/health" "chat-core-service health endpoint" || true
wait_for_http "http://localhost:${FRONTEND_PORT:-4300}" "chat-frontend" || true
wait_for_http "http://localhost:${N8N_PORT:-5690}" "chat-n8n" || true

log_info "utn-ai Sprint 1 local stack is running."
