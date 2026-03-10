# utn-ai full project

Complete monorepo implementation for the `utn-ai` course project.

## Monorepo Layout

```txt
full_project/
  backend/
    chat-core-service/   # NestJS + TypeScript
    n8n/
      workflows/
  frontend/
    chat-app/            # Angular
  chat-docker/
    docker-compose.yml
    .env.example
  scripts/
    setup.sh
    setup.ps1
    doctor.sh
    doctor.ps1
    start.sh
    start.ps1
  docs/
```

## Naming Conventions

- Product name: `utn-ai`
- Docker folder: `chat-docker`
- Backend service folder: `chat-core-service`
- All code and technical docs: English

## Quick Start

1. Create local environment file:

```bash
cp chat-docker/.env.example chat-docker/.env
```

2. Run setup:

```bash
./scripts/setup.sh
```

3. Start local stack:

```bash
./scripts/start.sh
```

For Windows PowerShell, use `.ps1` variants.

## Sprint 1 URLs

- Frontend: `http://localhost:4300`
- Core service health: `http://localhost:4012/health`
- Core service Swagger: `http://localhost:4012/api`
- n8n: `http://localhost:5690`
