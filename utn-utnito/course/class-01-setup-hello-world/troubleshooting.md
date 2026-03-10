# Troubleshooting - Clase 01

## 1) `node` no reconocido
### Sintoma
`node -v` falla en terminal.

### Solucion
- Instalar Node.js LTS.
- Reiniciar terminal.
- Volver a probar `node -v`.

## 2) `npm install` falla
### Sintoma
La instalacion de dependencias termina con error.

### Solucion
- Verificar Node LTS.
- Borrar `node_modules` y volver a ejecutar `npm install`.
- Copiar error completo al foro.

## 3) No aparece la configuracion de Play/F5
### Sintoma
Run and Debug no muestra launch del proyecto.

### Solucion
- Abrir la carpeta correcta: `c01-chat-app-start`.
- Verificar que existe `.vscode/launch.json`.

## 4) El navegador no abre en 5300
### Sintoma
No se puede acceder a `http://localhost:5300`.

### Solucion
- Revisar salida de Debug Console.
- Cerrar proceso que este usando puerto 5300.
- Ejecutar Play/F5 nuevamente.

## Nota sobre cierre automatico
- Al finalizar la sesion de debug (por ejemplo `Shift+F5`), VS Code ejecuta `stop:dev` y libera el puerto 5300.
