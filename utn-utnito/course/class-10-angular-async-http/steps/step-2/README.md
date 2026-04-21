# Step 2 - Base tecnica async

## Espanol

### Objetivo
Preparar el proyecto para consumir datos via HTTP local.

### Archivos a copiar
- `src/app/app.module.ts`
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`
- `src/app/core/model/response-message.interface.ts`
- `src/app/core/model/response-object.interface.ts`
- `src/app/core/model/pagination.interface.ts`
- `src/app/core/model/create-message-response.interface.ts`
- `angular.json`
- carpeta completa `backend_mock/`

### Conceptos
- `provideHttpClient()` en `providers` de `AppModule`.
- Config por environment (`mockApiBaseUrl`).
- Contratos de respuesta tipo API.
- Assets locales como backend mock.

### URLs mock (puerto 5300)
- `http://localhost:5300/backend_mock/conversations.json`
- `http://localhost:5300/backend_mock/messages-conv-1.json`
- `http://localhost:5300/backend_mock/messages-conv-2.json`
- `http://localhost:5300/backend_mock/messages-conv-3.json`
- `http://localhost:5300/backend_mock/reply-template.json`
