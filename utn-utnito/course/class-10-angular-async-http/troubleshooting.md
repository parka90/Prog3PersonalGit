# Troubleshooting - Clase 10

## 1) NullInjectorError: No provider for HttpClient
Causa: falta configurar `provideHttpClient()`.

Solucion:
- Revisar `src/app/app.module.ts`.
- Confirmar `providers: [provideHttpClient()]`.

## 2) 404 en `/backend_mock/*.json`
Causa: `backend_mock` no esta en assets o no se copio la carpeta.

Solucion:
- Revisar `angular.json` en `assets`.
- Confirmar que existe carpeta `backend_mock` en la raiz del proyecto.

## 3) `mockApiBaseUrl` undefined
Causa: no se aplico step 2 completo.

Solucion:
- Revisar `src/environments/environment.ts` y `environment.prod.ts`.
- Debe existir: `mockApiBaseUrl: '/backend_mock'`.

## 4) Conversaciones cargan pero mensajes no
Causa: nombre de archivo de mensajes no coincide con `messages-${conversationId}.json`.

Solucion:
- Revisar ids en `conversations.json`.
- Revisar nombres de archivos en `backend_mock`.

## 5) Send queda bloqueado en "Sending..."
Causa: falta `finalize(...)` o error en `subscribe`.

Solucion:
- Revisar `ChatComponent.sendMessage(...)`.
- Confirmar que `sendingMessage = false` se setea en `finalize`.

## 6) Error de tipos en modelos de respuesta
Causa: falta copiar modelos async (`ResponseObject`, `Pagination`, `CreateMessageResponse`).

Solucion:
- Reaplicar step 2 en `src/app/core/model`.
