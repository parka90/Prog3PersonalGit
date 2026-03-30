# Troubleshooting - Clase 04

## Español

### 1) "No se ejecuta JS"
- Verificar `<script src="./chat.js" defer></script>`.
- Revisar nombre exacto del archivo.
- Revisar consola del navegador.

### 2) "Submit recarga la página"
- Verificar `event.preventDefault()`.
- Verificar que el listener esté sobre el `form`.

### 3) "No aparece el mensaje (step 3/4)"
- Revisar selector del contenedor.
- Verificar `appendChild`.
- Verificar que input no esté vacío tras `trim()`.

### 4) "No aparece respuesta mock (step 4)"
- Verificar `await` al llamar `getMockReply`.
- Verificar que `setTimeout` se esté ejecutando.

### 5) "No se mueve el resizer (step 5)"
- Verificar `mousedown/mousemove/mouseup`.
- Verificar actualización de `--left-panel-width`.

### 6) "No funciona new chat / delete (step 6)"
- Verificar listeners sobre `#new-chat-btn` y `#chat-list`.
- Verificar `data-conversation-id`.
- Verificar actualización de `activeConversationId`.

### 7) "Falla fetch demo (step 6)"
- Verificar conexión de red.
- Verificar endpoint.
- Verificar `try/catch`.

---

## English

### 1) "JS is not running"
- Verify `<script src="./chat.js" defer></script>`.
- Check exact filename.
- Check browser console.

### 2) "Submit reloads page"
- Verify `event.preventDefault()`.
- Verify listener is attached to `form`.

### 3) "Message is not rendered (step 3/4)"
- Check messages selector.
- Verify `appendChild`.
- Verify non-empty input after `trim()`.

### 4) "Mock reply not shown (step 4)"
- Verify `await` on `getMockReply`.
- Verify `setTimeout` is running.

### 5) "Resizer does not move (step 5)"
- Verify `mousedown/mousemove/mouseup`.
- Verify `--left-panel-width` updates.

### 6) "New chat / delete not working (step 6)"
- Verify listeners on `#new-chat-btn` and `#chat-list`.
- Verify `data-conversation-id`.
- Verify `activeConversationId` update.

### 7) "Fetch demo fails (step 6)"
- Verify network.
- Verify endpoint.
- Verify `try/catch`.
