# Checklist - Clase 10

## Verificacion funcional
- [ ] App levanta en `http://localhost:5300`.
- [ ] Login sigue funcionando como en clase 9.
- [ ] Sidebar muestra "Loading conversations..." mientras carga.
- [ ] Conversaciones se cargan desde `backend_mock/conversations.json`.
- [ ] Al cambiar de conversacion, se cargan mensajes async.
- [ ] Si vuelvo a una conversacion ya cargada, usa cache local de mensajes.
- [ ] El boton Send pasa a estado `Sending...` mientras envia.
- [ ] Si falla una request, se muestra mensaje de error en UI.

## Verificacion tecnica
- [ ] `provideHttpClient()` configurado en `providers` de `app.module.ts`.
- [ ] `environment` define `mockApiBaseUrl`.
- [ ] `angular.json` incluye `backend_mock` en assets.
- [ ] Existen modelos de respuesta (`ResponseObject`, `Pagination`, etc).
- [ ] Existe `ChatApiService` con `listConversations`, `listMessages`, `createMessage`.
- [ ] `ChatService` expone metodos async (`loadConversations`, `loadMessages`, `sendDraftMessage`).
- [ ] `ChatComponent` usa `subscribe` + `finalize` para estados de UI.
