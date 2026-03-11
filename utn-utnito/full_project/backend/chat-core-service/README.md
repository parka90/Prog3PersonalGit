# chat-core-service

NestJS + TypeScript backend service for the UTNito course project.

## Scope (Sprint 2)

- Modular architecture with reusable base components
- `chat-app` BFF controller for frontend-driven use cases
- JWT authentication with users configured from environment variables
- SQLite persistence with TypeORM (`synchronize=true`)
- Mock AI provider (`AI_PROVIDER=mock`)
- Swagger documentation

## Main URLs

- Backend base URL: `http://localhost:5001`
- Swagger UI: `http://localhost:5001/utn-chat-back/api`

## Environment Variables

Use `.env.example` as reference:

```env
SWAGGER_APP_TITLE=UTNito chat core service
SWAGGER_APP_DESCRIPTION=UTNito chat core API
SWAGGER_APP_VERSION=1.0.0
SWAGGER_BASE_PATH=utn-chat-back
API_SECURITY_SCHEMA=jwt
API_SECURITY_SCHEMA_NAME=jwtAuth

APP_PORT=5001
APP_LOG_LEVEL=log
CORS_ALLOWED_ORIGIN=http://localhost:5300

DB_TYPE=sqlite
DB_DATABASE=./database/utnito_chat.db

AUTH_USERS_JSON=[{"userId":"user_carlos_gardel","username":"carlos.gardel","displayName":"Carlos Gardel","password":"123456","role":"STUDENT"}]
AUTH_APP_SALT=utnito-auth-salt
AUTH_TOKEN_EXPIRATION=1h
AUTH_REFRESH_TOKEN_EXPIRATION=1d

AI_PROVIDER=mock
```

## Conversation Status Model

- `ACTIVE`: current conversation for the user (exactly one active per user)
- `INACTIVE`: existing conversation not currently selected
- `ARCHIVED`: soft-deleted conversation (hidden by default from list)

State transitions implemented by the BFF:

- Creating a conversation makes it `ACTIVE` and moves previous `ACTIVE` to `INACTIVE`.
- Activating a conversation moves previous `ACTIVE` to `INACTIVE`.
- Archiving an `ACTIVE` conversation promotes the latest `INACTIVE` as `ACTIVE` (if one exists).

## API (BFF)

### Public endpoints

- `GET /health`
- `POST /auth/login`
- `POST /auth/refresh-token`

### JWT-protected endpoints

- `GET /auth/me`
- `GET /chat-app/conversations`
- `POST /chat-app/conversations`
- `GET /chat-app/conversations/:conversationId`
- `PATCH /chat-app/conversations/:conversationId/title`
- `PATCH /chat-app/conversations/:conversationId/activate`
- `PATCH /chat-app/conversations/:conversationId/archive`
- `GET /chat-app/conversations/:conversationId/messages`
- `POST /chat-app/conversations/:conversationId/messages`

## Run Locally

```bash
npm install
npm run start:dev
```

## Functional Validation Checklist (Swagger)

1. Open Swagger UI (`/utn-chat-back/api`).
2. Execute `POST /auth/login` with:
   ```json
   { "username": "carlos.gardel", "password": "123456" }
   ```
3. Copy `accessToken` and click `Authorize` in Swagger (`Bearer` token).
4. Call `POST /chat-app/conversations` twice and verify:
   - last created is `ACTIVE`
   - previous one changed to `INACTIVE`
5. Call `PATCH /chat-app/conversations/{id}/activate` on an `INACTIVE` conversation and verify status swap.
6. Call `PATCH /chat-app/conversations/{id}/archive` on current `ACTIVE` and verify:
   - conversation becomes `ARCHIVED`
   - latest `INACTIVE` becomes `ACTIVE` (if available)
7. Call `POST /chat-app/conversations/{id}/messages` with:
   ```json
   { "content": "Can you explain Sprint 2 backend goals?" }
   ```
   Verify response includes both `userMessage` and `assistantMessage`.
8. Call `GET /chat-app/conversations/{id}/messages` and verify persisted history order.
