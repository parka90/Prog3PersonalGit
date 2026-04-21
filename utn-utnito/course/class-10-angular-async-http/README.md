# Clase 10 - Asincronia en Angular (HttpClient + Observables)

## Espanol

### Objetivo
Pasar de servicios sincronos (clase 9) a flujo asincrono usando `HttpClient`, `Observable`, `subscribe` y estados de UI (`loading`, `error`, `sending`).

### Duracion sugerida
60 minutos

### Estructura de la clase
- `c10-chat-app-start`: punto de partida principal (estado final de clase 9).
- `steps/step-1/async-concept-demo`: mini proyecto aparte para explicar asincronia antes de tocar UTNito.
- `steps/step-2`: base tecnica async (`provideHttpClient`, modelos de respuesta, `backend_mock`, `mockApiBaseUrl`).
- `steps/step-3`: `ChatApiService` + conversaciones async (merge de capa HTTP y primer consumo en UI).
- `steps/step-4`: mensajes async por conversacion.
- `steps/step-5`: envio async de mensaje + estado de envio.
- `steps/step-6`: snapshot final.
- `c10-chat-app-end`: resultado final esperado.
- `slides/outline.md`: guia para presentacion.
- `checklist.md`: validacion final.
- `troubleshooting.md`: errores comunes.

### Flujo de practica
1. Demo conceptual:
   - `cd programacion_III_UTN_private/utn-utnito/course/class-10-angular-async-http/steps/step-1/async-concept-demo`
   - `npm install`
   - `npm run start`
2. Proyecto principal:
   - `cd ../../c10-chat-app-start`
   - `npm install`
   - `npm run start`
3. Aplicar cambios step por step copiando archivos desde `../steps`.

### Entregable
- Frontend con estructura de clase 9 (`model` + `service`) y asincronia agregada.
- `ChatApiService` como adaptador HTTP a `backend_mock`.
- Conversaciones y mensajes cargados de forma asincrona.
- Envio de mensaje asincrono con `sendingMessage` y manejo de error.

---

## English

### Objective
Move from sync services (class 9) to async frontend flow using `HttpClient`, `Observable`, `subscribe`, and UI states (`loading`, `error`, `sending`).

### Suggested Duration
60 minutes

### Class Structure
- `c10-chat-app-start`: main starting point (class 9 final state).
- `steps/step-1/async-concept-demo`: separate mini project to explain async flow before UTNito.
- `steps/step-2`: async foundation (`provideHttpClient`, response models, `backend_mock`, `mockApiBaseUrl`).
- `steps/step-3`: `ChatApiService` + async conversations (merged step).
- `steps/step-4`: async messages by conversation.
- `steps/step-5`: async send message + sending state.
- `steps/step-6`: final snapshot.
- `c10-chat-app-end`: expected final result.
- `slides/outline.md`: presentation guide.
- `checklist.md`: final validation.
- `troubleshooting.md`: common issues.

### Step Copy Rule
- Follow each step README and copy only listed files into `c10-chat-app-start`.
- Step 6 is a final snapshot from `c10-chat-app-end/src`.
