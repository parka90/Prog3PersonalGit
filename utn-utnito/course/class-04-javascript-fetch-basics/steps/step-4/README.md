# Step 4 - Demo comparativa: Sync vs Async

## Español

### Objetivo
Comparar flujo síncrono y asíncrono en un mismo ejemplo:
- `Send (Sync)` bloquea el hilo principal por 1 segundo (demo pedagógica).
- `Send (Async)` responde con demora.
- `Clear` limpia los mensajes sin recargar la página.
- ambos usan numeración `#n` para comparar trazabilidad.

### Archivos a copiar
- `async-send-demo.html`
- `async-send-demo.css`
- `async-send-demo.js`

### Conceptos
- síncrono vs asíncrono
- `Promise`
- `setTimeout`
- `async/await`
- asincronía sin bloquear interfaz

### Qué observar
1. Con `Send (Sync)` la UI queda bloqueada durante 1 segundo.
2. Con `Send (Async)` la respuesta llega después.
3. Puedo enviar varias veces sin limpiar el input.
4. El `#n` permite asociar cada user message con su reply.
5. Con `Clear` limpio la pantalla sin recargar.

### Idea clave
Asíncrono no significa complejo.
Significa esperar resultados sin frenar la aplicación.

### Validación
- enviar varias veces usando botón sync y async;
- verificar `User #n` y `Assistant #n`;
- verificar que sync bloquea la UI durante 1 segundo;
- verificar que async llega con demora sin bloquear la UI;
- verificar que `Clear` borra mensajes y reinicia la numeración.

---

## English

### Objective
Compare synchronous and asynchronous flow in one single demo.

### Files to copy
- `async-send-demo.html`
- `async-send-demo.css`
- `async-send-demo.js`
