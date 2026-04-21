# Step 5 - Envio async de mensajes

## Espanol

### Objetivo
Enviar mensaje de forma asincrona y reflejar estado de envio.

### Archivos a copiar
- `src/app/core/service/chat.service.ts`
- `src/app/chat/chat.component.ts`
- `src/app/chat/chat.component.html`
- `src/app/chat/chat.component.css`

### Conceptos
- `sendDraftMessage(): Observable<CreateMessageResponse>`.
- `sendingMessage` + boton `Sending...`.
- `finalize(...)` para resetear estado.
- La logica de envio queda en `ChatService`; el componente solo maneja el feedback visual del envio.

### URL mock usada en este step
- `http://localhost:5300/backend_mock/reply-template.json`
