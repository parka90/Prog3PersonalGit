# Clase 06 - Componentes y Routing (Angular)

## Espanol

### Objetivo
Pasar de navegacion local por estado (`currentView`) a navegacion real por rutas en Angular.

### Duracion sugerida
60 minutos

### Estructura de la clase
- `c06-chat-app-start`: punto de partida principal (estado final de clase 5).
- `steps/step-1/routing-concept-demo`: mini proyecto aparte para explicar routing con `ComponentOne` y `ComponentTwo`.
- `steps/step-2`: crear rutas base y conectar RouterModule.
- `steps/step-3`: usar `router-outlet` en `AppComponent`.
- `steps/step-4`: login navega a `/chat`.
- `steps/step-5`: logout navega a `/login`.
- `steps/step-6`: redirects (`''` y `**`) y validacion final.
- `steps/step-7`: cierre y estado final esperado.
- `c06-chat-app-end`: resultado final esperado.
- `slides/outline.md`: guia para presentacion.
- `checklist.md`: validacion final.
- `troubleshooting.md`: errores comunes.

### Flujo de practica
1. Demo conceptual:
   - `cd programacion_III_UTN/utn-utnito/course/class-06-angular-components-routing/steps/step-1/routing-concept-demo`
   - `npm install`
   - `npm run start`
2. Proyecto principal:
   - `cd ../../../c06-chat-app-start`
   - `npm install`
   - `npm run start`
3. Aplicar cambios step por step copiando archivos desde `../steps`.

### Debug (nota breve)
- Opcion simple: Chrome DevTools (`F12` -> `Sources` -> breakpoints).
- Opcion IDE: VS Code `Run and Debug (F5)` para breakpoints en codigo fuente.

### Entregable
- Navegacion SPA funcionando con rutas:
  - `/login`
  - `/chat`
- Login redirige a chat.
- Logout redirige a login.
- Rutas invalidas redirigen a login.

---

## English

### Objective
Move from local state navigation (`currentView`) to real route-based navigation in Angular.

### Suggested Duration
60 minutes

### Class Structure
- `c06-chat-app-start`: main starting point (class 5 final state).
- `steps/step-1/routing-concept-demo`: separate mini project to explain routing with `ComponentOne` and `ComponentTwo`.
- `steps/step-2`: create base routes and connect RouterModule.
- `steps/step-3`: use `router-outlet` in `AppComponent`.
- `steps/step-4`: login navigates to `/chat`.
- `steps/step-5`: logout navigates to `/login`.
- `steps/step-6`: redirects (`''` and `**`) and final validation.
- `steps/step-7`: closing step and expected final state.
- `c06-chat-app-end`: expected final result.
- `slides/outline.md`: presentation guide.
- `checklist.md`: final validation.
- `troubleshooting.md`: common issues.
