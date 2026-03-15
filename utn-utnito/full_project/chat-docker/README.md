# chat-docker

Local infrastructure and runtime stack for `utn-utnito`.

## Included Services

- `chat-frontend` (Angular app served by Nginx)
- `chat-core-service` (NestJS + TypeScript)
- `chat-n8n`

Notes:

- `chat-core-service` uses SQLite.
- `chat-n8n` uses its default SQLite storage.

## Environment

Create local env file:

```bash
cp .env.example .env
```

## Start Manually (Docker Compose)

Go to this folder first:

```bash
cd utn-utnito/full_project/chat-docker
```

Then run:

Start only n8n:

```bash
docker compose up -d chat-n8n
```

Start full project (frontend + backend + n8n):

```bash
docker compose --profile full up -d
```

Check container status:

```bash
docker compose ps
```

Stop stack:

```bash
docker compose down
```

Follow logs:

```bash
docker compose logs -f
```

## Start With Scripts

From `full_project` root:

```bash
./scripts/doctor.sh
./scripts/start-n8n.sh
```

Start full project:

```bash
./scripts/start-full.sh
```

Compatibility alias:

- `./scripts/start.sh` starts n8n-only.

## Default Host Ports

- Frontend: `4300`
- Core service: `4012`
- n8n: `5690`

All values are configurable in `.env`.
