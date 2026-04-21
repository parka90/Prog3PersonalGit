# Angular Binding Reference (Class 07)

## 1) Interpolation
```html
<h1>{{ title }}</h1>
```
Renders a TypeScript value in template text.

## 2) Property binding
```html
<button [disabled]="isDisabled">Send</button>
```
Binds a DOM property to a component value.

## 3) Event binding
```html
<button (click)="onClick()">Click</button>
```
Executes a component method when user triggers an event.

## 4) Form submit
```html
<form (submit)="onSubmit($event)">...</form>
```
Use `event.preventDefault()` when you want to avoid browser default behavior.

## 5) Reactive Forms (minimal)
```ts
this.loginForm = this.formBuilder.group({
  username: ['', [Validators.required, Validators.minLength(3)]],
  password: ['', [Validators.required]],
});
```
Used in Step 6 as an Angular-native forms variant.
