# Slide Outline - Clase 06 (Practica)

## Slide 1 - Titulo
- Programacion III - Practica 06
- Angular: Componentes y Routing

## Slide 2 - Objetivo de hoy
- Pasar de `currentView` (estado local) a navegacion por URL.
- Entender routing como base de SPA.

## Slide 3 - Demo conceptual (proyecto aparte)
- `ComponentOne` y `ComponentTwo`
- Dos formas de navegar:
  - `routerLink` (UI)
  - `router.navigate()` (logica)
- `router-outlet` como punto de render dinamico
- Mismo resultado, mismo mapa de rutas
- Navegacion sin recarga completa

## Slide 4 - Step 2
- Crear `app.routes.ts`
- Registrar rutas en `RouterModule.forRoot(routes)`

## Slide 5 - Step 3
- `AppComponent` con `router-outlet`
- Dejar de renderizar con `*ngIf` por vista

## Slide 6 - Step 4
- Login navega a `/chat` con `Router`

## Slide 7 - Step 5
- Logout navega a `/login`

## Slide 8 - Step 6
- Redirect de ruta vacia
- Wildcard para rutas invalidas

## Slide 9 - Validacion final
- `/login` ok
- Login -> `/chat`
- Logout -> `/login`
- URL invalida -> `/login`

## Slide 10 - Proxima clase
- Binding y formularios en Angular
- Eventos + captura de input + estado UI
