# Step 4 - Mensajes async

## Espanol

### Objetivo
Cargar mensajes async al seleccionar una conversacion.

### Archivos a copiar
- `src/app/core/service/chat.service.ts`
- `src/app/chat/chat.component.ts`
- `src/app/chat/chat.component.html`
- `src/app/chat/chat.component.css`

### Conceptos
- `loadMessages(conversationId)`.
- Estado `loadingMessages`.
- Cache local de mensajes por `conversationId`.
- Continuidad con clase 9: `ChatComponent` orquesta UI y `ChatService` concentra estado de chat.

### URL mock usada en este step
- `http://localhost:5300/backend_mock/messages-conv-1.json`
