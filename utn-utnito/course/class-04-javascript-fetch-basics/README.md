# Clase 04 - JavaScript básico en el navegador (DOM + eventos + async + resizer)

## Español

### Objetivo
Entender cómo JavaScript se conecta con HTML y cómo reacciona a eventos del usuario.

En esta clase el foco pedagógico es progresivo:
- primero interacción mínima,
- luego asincronía mínima,
- luego modificación visual del layout con JS,
- y recién al final integración completa en el chat.

### Duración sugerida
60 minutos

### Estructura de la clase
- `c04-html-start`: punto de partida (chat estático).
- `steps/step-1`: conectar `chat.js` con `chat.html` (`script + defer`).
- `steps/step-2`: DOM básico + `submit` + `preventDefault`.
- `steps/step-3`: mini demo aislada (input + botón + mensaje en pantalla).
- `steps/step-4`: mini demo aislada con respuesta mock asincrónica.
- `steps/step-5`: demo aislada de layout + width control (sin lógica de chat).
- `steps/step-6`: integración final (chat completo con conversaciones, delete, send y resizer).
- `c04-html-end`: resultado final esperado.
- `slides/outline.md`: guía para PPT.
- `checklist.md`: validación final.
- `troubleshooting.md`: errores comunes.

### Flujo de práctica
1. Clonar repositorio:
   - `git clone https://github.com/matmatys/programacion_III_UTN.git`
2. Entrar a carpeta inicial:
   - `cd programacion_III_UTN/utn-utnito/course/class-04-javascript-fetch-basics/c04-html-start`
3. Abrir en VS Code.
4. Seguir steps en orden.
5. Validar cada paso con doble click en el HTML del step correspondiente.

### Entregable
- `chat.html`
- `chat.css`
- `chat.js`

---

## English

### Objective
Understand how JavaScript connects to HTML and reacts to user events.

This class uses an incremental teaching flow:
- minimal interaction first,
- then minimal async,
- then visual layout change with JS,
- and finally full chat integration.

### Suggested Duration
60 minutes

### Class Structure
- `c04-html-start`: starting point (static chat).
- `steps/step-1`: connect `chat.js` to `chat.html` (`script + defer`).
- `steps/step-2`: basic DOM + `submit` + `preventDefault`.
- `steps/step-3`: isolated mini demo (input + button + render message).
- `steps/step-4`: isolated mini demo with async mock reply.
- `steps/step-5`: isolated layout + width control demo (no chat logic).
- `steps/step-6`: final integration (full chat with conversations, delete, send, and resizer).
- `c04-html-end`: expected final result.
- `slides/outline.md`: PPT guide.
- `checklist.md`: final validation.
- `troubleshooting.md`: common issues.

### Practice Flow
1. Clone repository:
   - `git clone https://github.com/matmatys/programacion_III_UTN.git`
2. Go to initial folder:
   - `cd programacion_III_UTN/utn-utnito/course/class-04-javascript-fetch-basics/c04-html-start`
3. Open in VS Code.
4. Follow steps in order.
5. Validate each step by opening each step HTML file in browser.

### Deliverable
- `chat.html`
- `chat.css`
- `chat.js`
