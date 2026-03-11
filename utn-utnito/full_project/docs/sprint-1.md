# Sprint 1 Scope

Sprint 1 goal: deliver a runnable frontend chat base and backend health support using a consistent UTNito stack and style.

## Included

- NestJS + TypeScript backend in `backend/chat-core-service`
  - Modular structure
  - Basic reusable layer under `src/basic`
  - Health module (`module/controller/service`)
  - `GET /health`
- Angular frontend in `frontend/chat-app`
  - Module-based app scaffold
  - Base chat component with local mock responses
  - Route-based app entry
- VS Code debug configurations
  - Backend launch config
  - Frontend launch/tasks/extensions config
- Docker integration for full local stack
  - `chat-frontend`
  - `chat-core-service`
  - `chat-postgres`
  - `chat-n8n`

## Deferred to Sprint 2+

- Chat REST endpoints
- Frontend-backend data integration
- Persistence and conversation model
- Authentication and authorization
