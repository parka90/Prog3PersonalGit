# Troubleshooting - Clase 07

## 1) Error: Can't bind to 'formGroup'
Causa: falta `ReactiveFormsModule` en `AppModule` (step 6).

Solucion:
- Importar `ReactiveFormsModule` desde `@angular/forms`.
- Agregarlo en `imports` del modulo.

## 2) Error: Property ... does not exist on type ...
Causa: falta declarar variable o metodo usado en template.

Solucion:
- Revisar `login.component.ts` o `chat.component.ts`.
- Confirmar nombres exactos de propiedades/metodos.

## 3) Al enviar login no cambia de pantalla
Causa: submit invalido o no se ejecuta `router.navigate(['/chat'])`.

Solucion:
- Revisar `onSubmit()`.
- Revisar que ruta `/chat` exista en `app.routes.ts`.

## 4) Boton Send nunca se habilita
Causa: `draftMessage` no se actualiza desde el textarea.

Solucion:
- Revisar binding de input en composer.
- Confirmar `onDraftInput(...)` o `[(ngModel)]` segun step.
