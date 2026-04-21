# Troubleshooting - Clase 06

## Espanol

## 1) Error: `router-outlet is not a known element`
Causa probable:
- `RouterModule` no esta importado en `AppModule`.

Solucion:
- Verificar en `app.module.ts`:
  - `import { RouterModule } from '@angular/router';`
  - `RouterModule.forRoot(routes)` en `imports`.

## 2) Navega a `/chat` pero no cambia pantalla
Causa probable:
- `AppComponent` sigue con `*ngIf` y no usa `router-outlet`.

Solucion:
- Reemplazar contenido de `app.component.html` por:
```html
<router-outlet></router-outlet>
```

## 3) `Cannot match any routes`
Causa probable:
- Ruta no definida en `app.routes.ts`.

Solucion:
- Agregar ruta solicitada o wildcard:
```ts
{ path: '**', redirectTo: '/login' }
```

## 4) Login no navega
Causa probable:
- No se inyecto `Router` en `LoginComponent`.

Solucion:
- Inyectar router y llamar:
```ts
this.router.navigate(['/chat']);
```

## English

## 1) Error: `router-outlet is not a known element`
Likely cause:
- `RouterModule` not imported in `AppModule`.

Fix:
- Check `app.module.ts`:
  - `import { RouterModule } from '@angular/router';`
  - `RouterModule.forRoot(routes)` inside `imports`.

## 2) Navigates to `/chat` but view does not change
Likely cause:
- `AppComponent` still uses `*ngIf` and not `router-outlet`.

Fix:
- Replace `app.component.html` with:
```html
<router-outlet></router-outlet>
```
