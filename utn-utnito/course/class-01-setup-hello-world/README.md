# Clase 01 - Setup + Hello World (Angular)

## Español

### Objetivo
Presentar la arquitectura general de UTNito, instalar herramientas obligatorias y ejecutar un Hello World en Angular desde VS Code usando Play/F5.

### Duración sugerida
60 minutos (6 bloques de 10 minutos)

### Estructura de la clase
- `slides/`: guía para armar PPT de la clase.
- `c01-chat-app-start`: proyecto inicial para arrancar la práctica.
- `steps/step-1`: archivos a copiar para aplicar el cambio de la clase.
- `c01-chat-app-end`: resultado final esperado al terminar la clase.
- `checklist.md`: validación de cierre para alumnos.
- `troubleshooting.md`: errores comunes y resolución rápida.
- `resources/`: recursos auxiliares para foro y explicación.

### Herramientas obligatorias
- Node.js LTS
- Git
- Visual Studio Code

### Flujo de la práctica
1. Validar instalación de herramientas.
2. Clonar repositorio del curso:
   - `git clone https://github.com/matmatys/programacion_III_UTN.git`
3. Entrar a la carpeta del proyecto de la clase:
   - `cd programacion_III_UTN/utn-utnito/course/class-01-setup-hello-world/c01-chat-app-start`
4. Abrir `c01-chat-app-start` en VS Code.
5. Ejecutar `npm install`.
6. Ejecutar el proyecto:
   - Opción A (VS Code): Run and Debug con Play/F5.
   - Opción B (línea de comandos): `npm start`.
7. Copiar archivos de `steps/step-1` sobre `c01-chat-app-start`.
8. Ejecutar nuevamente y validar `Hello UTNito`.

### Comandos de verificación
```bash
node -v
npm -v
git --version
```

### Criterio de clase aprobada
El alumno puede correr el proyecto desde VS Code y visualizar la pantalla final de "Hello UTNito" en `http://localhost:5300`.

## English

### Objective
Present the overall UTNito architecture, install required tools, and run an Angular Hello World from VS Code using Play/F5.

### Suggested Duration
60 minutes (6 blocks of 10 minutes)

### Class Structure
- `slides/`: guide to prepare class slides.
- `c01-chat-app-start`: initial project used to start the practice.
- `steps/step-1`: files to copy for the class change.
- `c01-chat-app-end`: expected final result at the end of class.
- `checklist.md`: closing validation checklist for students.
- `troubleshooting.md`: common errors and quick fixes.
- `resources/`: support resources for forum and explanation.

### Required Tools
- Node.js LTS
- Git
- Visual Studio Code

### Practice Flow
1. Validate tool installation.
2. Clone course repository:
   - `git clone https://github.com/matmatys/programacion_III_UTN.git`
3. Go to the class project folder:
   - `cd programacion_III_UTN/utn-utnito/course/class-01-setup-hello-world/c01-chat-app-start`
4. Open `c01-chat-app-start` in VS Code.
5. Run `npm install`.
6. Run the project:
   - Option A (VS Code): Run and Debug with Play/F5.
   - Option B (command line): `npm start`.
7. Copy files from `steps/step-1` into `c01-chat-app-start`.
8. Run again and validate `Hello UTNito`.

### Verification Commands
```bash
node -v
npm -v
git --version
```

### Class Completion Criteria
The student can run the project from VS Code and see the final "Hello UTNito" screen at `http://localhost:5300`.
