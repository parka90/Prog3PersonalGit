# Architecture Overview (Initial)

Current monorepo target architecture:

```txt
Browser
  -> Frontend (Angular chat-app)
    -> Backend API (NestJS chat-core-service)
      -> PostgreSQL
      -> n8n (AI orchestration layer)
        -> External AI provider
```

## Sprint 1.2 State

- `chat-core-service` is implemented with NestJS + TypeScript.
- Backend includes a reusable basic layer in `src/basic`.
- `health` is implemented as service/controller/module.
- `chat-app` is implemented as an Angular application base.
- Dockerized local stack includes frontend, backend, PostgreSQL, and n8n.

## Default Local Ports

- Frontend host port: `4300`
- Backend host port: `4012`
- PostgreSQL host port: `5454`
- n8n host port: `5690`

All host ports are configurable in `chat-docker/.env`.
