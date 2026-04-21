# Slide Outline - Clase 10 (Practica)

## Slide 1 - Titulo
- Programacion III - Practica 10
- Asincronia en Angular

## Slide 2 - Objetivo de hoy
- Mantener arquitectura de clase 9.
- Agregar flujo async con HttpClient + Observables.

## Slide 3 - Step 1 (demo conceptual)
- Request async simulada.
- `loading`, `error`, `success`.
- `subscribe` + `finalize`.

## Slide 4 - Step 2
- Base tecnica async.
- `provideHttpClient()`, modelos de respuesta, `mockApiBaseUrl`, `backend_mock`.

## Slide 5 - Step 3
- `ChatApiService`.
- Conversaciones async en UI (primer consumo real).

## Slide 6 - Step 4
- Mensajes async al seleccionar conversacion.
- Estado `loadingMessages`.

## Slide 7 - Step 5
- Send async.
- `sendingMessage`, `finalize`, error handling.

## Slide 8 - Step 6
- Snapshot final.
- Checklist de cierre.

## Slide 9 - Proxima clase
- Clase 11: contrato API y Swagger-first.
- Diseñar endpoints antes de backend real.
