# Clase 07 - Binding, eventos y formularios (Angular)

## Espanol

### Objetivo
Conectar inputs, botones y submit del login y del composer del chat usando binding y eventos en Angular.

### Duracion sugerida
60 minutos

### Estructura de la clase
- `c07-chat-app-start`: punto de partida principal (estado final de clase 6).
- `steps/step-1/binding-concept-demo`: mini proyecto aparte para explicar binding.
- `steps/step-2/events-concept-demo`: mini proyecto aparte para explicar eventos.
- `steps/step-3`: binding de inputs en login (captura basica de datos).
- `steps/step-4`: submit de login con validacion minima y navegacion.
- `steps/step-5`: composer reactivo en chat (captura, envio y limpieza).
- `steps/step-6`: version Angular Forms minima (Reactive Forms + Validators basicos).
- `steps/step-7`: snapshot final de cierre.
- `c07-chat-app-end`: resultado final esperado.
- `slides/outline.md`: guia para presentacion.
- `checklist.md`: validacion final.
- `troubleshooting.md`: errores comunes.

### Flujo de practica
1. Demo de binding:
   - `cd programacion_III_UTN/utn-utnito/course/class-07-angular-binding-events-forms/steps/step-1/binding-concept-demo`
   - `npm install`
   - `npm run start`
2. Demo de eventos:
   - `cd ../step-2/events-concept-demo`
   - `npm install`
   - `npm run start`
3. Proyecto principal:
   - `cd ../../../c07-chat-app-start`
   - `npm install`
   - `npm run start`
4. Aplicar cambios step por step copiando archivos desde `../steps`.
   - Desde `step-3` en adelante, cada step trae solo archivos delta (los que cambian en ese paso).
   - No copiar carpetas completas si el README del step indica archivos puntuales.

### Entregable
- Login con captura de inputs y submit validado.
- Navegacion login -> chat funcionando.
- Composer del chat reactivo (captura, envio, limpieza).
- Variante minima con Reactive Forms en login.

---

## English

### Objective
Connect login and chat composer inputs/buttons/submits using Angular binding and events.

### Suggested Duration
60 minutes

### Class Structure
- `c07-chat-app-start`: main starting point (class 6 final state).
- `steps/step-1/binding-concept-demo`: separate mini project to explain binding.
- `steps/step-2/events-concept-demo`: separate mini project to explain events.
- `steps/step-3`: login input binding (basic data capture).
- `steps/step-4`: login submit with minimal validation and navigation.
- `steps/step-5`: reactive chat composer (capture, send, clear).
- `steps/step-6`: minimal Angular Forms version (Reactive Forms + basic Validators).
- `steps/step-7`: final closing snapshot.
- `c07-chat-app-end`: expected final result.
- `slides/outline.md`: presentation guide.
- `checklist.md`: final validation.
- `troubleshooting.md`: common issues.

### Step Copy Rule
- From `step-3` onward, each step contains only delta files (only what changes in that step).
- Follow each step README and copy only the listed files into `c07-chat-app-start/src/app/...`.
