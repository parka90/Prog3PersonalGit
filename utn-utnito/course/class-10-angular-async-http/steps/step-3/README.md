# Step 3 - ChatApiService + Conversaciones async

## Espanol

### Objetivo
Crear la capa HTTP y conectarla al primer flujo async visible en UI (conversaciones).

### Archivos a copiar
- `src/app/core/service/chat-api.service.ts`
- `src/app/core/service/chat.service.ts`
- `src/app/chat/chat.component.ts`
- `src/app/chat/chat.component.html`
- `src/app/chat/chat.component.css`

### Conceptos
- Servicio adaptador (`ChatApiService`).
- `HttpClient.get(...)` tipado.
- `map(...)` para unwrap de respuesta.
- `delay(...)` para simular latencia.
- `loadConversations()` async desde `ChatService`.
- `loadingConversations` + `finalize` en componente.
- Se mantiene la arquitectura de clase 9: `ChatService` sigue como capa de estado/reglas.

### URLs mock (puerto 5300)
- `http://localhost:5300/backend_mock/conversations.json`
- `http://localhost:5300/backend_mock/messages-conv-1.json`
- `http://localhost:5300/backend_mock/reply-template.json`
