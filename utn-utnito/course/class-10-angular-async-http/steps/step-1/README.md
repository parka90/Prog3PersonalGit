# Step 1 - Demo conceptual de asincronia

## Espanol

### Objetivo
Explicar el flujo async minimo con un mini chat antes de tocar UTNito:
- disparar request,
- mostrar loading,
- manejar success/error,
- cerrar loading con `finalize`.

### Proyecto del step
- `async-concept-demo`

### Flujo
1. `cd steps/step-1/async-concept-demo`
2. `npm install`
3. `npm run start`

### Conceptos
- `Observable` con casos de uso similares al chat real.
- `subscribe({ next, error })` para load y send.
- `finalize(...)` para apagar `loadingMessages` / `sendingMessage` siempre.
- Envio de mensaje + respuesta `echo` mock asincrona.
