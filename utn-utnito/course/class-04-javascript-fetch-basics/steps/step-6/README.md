# Step 6 - Integracion final y cierre

## Espanol

### Objetivo
Integrar todo en una version final que incluya chats locales, envio de mensajes y resizer lateral.

### Archivos a copiar
- `chat.html`
- `chat.css`
- `chat.js`

### Conceptos
- constantes para selectores
- funciones helper (`createMessageElement`, `setComposerDisabled`)
- estado local de conversaciones (`state`, `activeConversationId`)
- crear chat nuevo y cambiar chat activo
- eliminar chats con boton `X`
- resizer drag & drop para ancho de sidebar
- scroll automatico
- foco de input al finalizar

### Validacion
- enviar varios mensajes seguidos,
- crear un chat con `New chat` y escribir en ese chat,
- cambiar entre chats y verificar historiales separados,
- eliminar un chat desde `X` y verificar seleccion activa correcta,
- arrastrar la barra vertical y verificar cambio de ancho,
- validar que el input se deshabilita durante la espera,
- validar respuesta mock en la conversacion activa.

---

## English

### Objective
Finalize an integrated version with local chats, message flow, and draggable sidebar resizer.

### Files to copy
- `chat.html`
- `chat.css`
- `chat.js`
