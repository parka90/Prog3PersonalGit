# Angular Async HTTP Reference (Class 10)

## 1) Why async now
In class 9, services were local and sync.
In class 10, we keep the same architecture but service calls become async.

## 2) HttpClient + Observable
`HttpClient` returns `Observable<T>`.
The component subscribes and updates UI state.

```ts
this.chatService
  .loadConversations()
  .pipe(finalize(() => (this.loadingConversations = false)))
  .subscribe(...)
```

## 3) Response wrappers
We use typed wrappers to simulate real backend contracts.

```ts
ResponseObject<T>
Pagination<T>
CreateMessageResponse
```

## 4) UI states to teach
- `loading`: request in progress.
- `error`: request failed.
- `success`: data rendered.
- `sending`: message submit in progress.

## 5) Separation of responsibilities
- Component: UI events + loading/error flags.
- ChatService: domain state + orchestration.
- ChatApiService: HTTP adapter layer.
- Models: typed contracts.

## Class scope
- No real backend yet.
- JSON files under `backend_mock` simulate remote responses.
- Next classes replace this with real backend endpoints.
