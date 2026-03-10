# chat-docker

Local infrastructure and runtime stack for `utn-ai`.

## Included Services (Sprint 1.2)

- `chat-frontend` (Angular app served by Nginx)
- `chat-core-service` (NestJS + TypeScript)
- `chat-postgres`
- `chat-n8n`

## Environment

Create local env file:

```bash
cp .env.example .env
```

## Start

From `full_project` root:

```bash
./scripts/start.sh
```

## Default Host Ports

- Frontend: `4300`
- Core service: `4012`
- PostgreSQL: `5454`
- n8n: `5690`

All values are configurable in `.env`.
