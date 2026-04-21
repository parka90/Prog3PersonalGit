# Step 3 - Login: binding de inputs

## Espanol

### Objetivo
Capturar username/password en `LoginComponent` con `(input)` y dejar el submit navegando a `/chat` como en clase 6.

### Archivos a copiar
- `login/login.component.ts` -> copiar sobre `c07-chat-app-start/src/app/login/login.component.ts`
- `login/login.component.html` -> copiar sobre `c07-chat-app-start/src/app/login/login.component.html`
- `login/login.component.css` -> copiar sobre `c07-chat-app-start/src/app/login/login.component.css`

### Conceptos
- Property binding
- Event binding en inputs
- `console.log` para observar captura de datos
- `(submit)` con `preventDefault` y `Router.navigate`

### Validacion
- Al escribir en username/password, se ven logs en consola.
- Al hacer submit, se loguean los datos y se navega a `/chat`.
