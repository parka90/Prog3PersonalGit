# Sprint 0 Scope

Sprint 0 goal: establish a stable and repeatable local development foundation.

## Included

- Monorepo skeleton aligned with the UTNito architecture style
- Naming conventions finalized (`utn-ai`, `chat-docker`, `chat-core-service`)
- Local Docker stack for foundational services:
  - PostgreSQL
  - n8n
- Cross-platform scripts:
  - `setup` for bootstrap checks and dependency install
  - `doctor` for diagnostics
  - `start` for local stack startup
- Port strategy to avoid collisions with active local projects

## Deferred to Sprint 1+

- NestJS implementation inside `backend/chat-core-service`
- Angular implementation inside `frontend/chat-app`
- Full end-to-end chat flow
- Course checkpoint extraction and class-by-class material
