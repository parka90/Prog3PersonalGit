# Clase 01 - Setup + Hello World (Angular)

## Objetivo
Presentar la arquitectura general de UTNito, instalar herramientas obligatorias y ejecutar un Hello World en Angular desde VS Code usando Play/F5.

## Duración sugerida
60 minutos (6 bloques de 10 minutos)

## Estructura de la clase
- `slides/`: guía para armar PPT de la clase.
- `c01-chat-app-start`: proyecto inicial para arrancar la práctica.
- `steps/step-1`: archivos a copiar para aplicar el cambio de la clase.
- `c01-chat-app-end`: resultado final esperado al terminar la clase.
- `checklist.md`: validación de cierre para alumnos.
- `troubleshooting.md`: errores comunes y resolución rápida.
- `resources/`: recursos auxiliares para foro y explicación.

## Herramientas obligatorias
- Node.js LTS
- Git
- Visual Studio Code

## Flujo de la práctica
1. Validar instalación de herramientas.
2. Clonar repositorio del curso:
   - `git clone https://github.com/matmatys/programacion_III_UTN.git`
3. Entrar a la carpeta del proyecto de la clase:
   - `cd programacion_III_UTN/utn-utnito/course/class-01-setup-hello-world/c01-chat-app-start`
4. Abrir `c01-chat-app-start` en VS Code.
5. Ejecutar `npm install`.
6. Ejecutar Run and Debug con Play/F5.
7. Copiar archivos de `steps/step-1` sobre `c01-chat-app-start`.
8. Ejecutar nuevamente y validar `Hello UTNito`.

## Comandos de verificación
```bash
node -v
npm -v
git --version
```

## Criterio de clase aprobada
El alumno puede correr el proyecto desde VS Code y visualizar la pantalla final de "Hello UTNito" en `http://localhost:5300`.
