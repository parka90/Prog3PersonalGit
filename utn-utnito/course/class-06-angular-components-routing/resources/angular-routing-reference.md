# Referencia rapida - Routing Angular (Clase 06)

## 1) Definir rutas

```ts
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', redirectTo: '/login' },
];
```

## 2) Conectar rutas en AppModule

```ts
imports: [BrowserModule, RouterModule.forRoot(routes)]
```

## 3) Punto de render de rutas

```html
<router-outlet></router-outlet>
```

## 4) Navegacion por codigo

```ts
this.router.navigate(['/chat']);
this.router.navigate(['/login']);
```

## 5) Navegacion por template (demo)

```html
<a routerLink="/one">Go to One</a>
<a routerLink="/two">Go to Two</a>
```

## Idea clave
Routing en Angular = cambiar componente segun URL sin recargar toda la pagina (SPA).
