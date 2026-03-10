# Slide Outline - Clase 01 (Practica)

## Slide 1 - Titulo
- Programacion III - Practica 01
- UTNito
- Setup inicial + Hello World Angular

## Slide 2 - Arquitectura general (alto nivel)
- Frontend Angular (`chat-app`)
- Backend NestJS (`chat-core-service`) [clases futuras]
- Persistencia + AI [clases futuras]

## Slide 3 - Objetivo
- Entender el camino del curso por checkpoints.
- Preparar entorno local.
- Ejecutar app con VS Code Play/F5.

## Slide 4 - Herramientas obligatorias de hoy
- Node.js LTS: https://nodejs.org/en/download
- Git: https://git-scm.com/downloads
- Visual Studio Code: https://code.visualstudio.com/download
- Descargar siempre desde sitios oficiales.
- Instalar en este orden: Node.js -> Git -> VS Code.
- Reiniciar terminal al terminar las instalaciones.

## Slide 5 - Verificaciones
- `node -v`
- `npm -v`
- `git --version`

## Slide 6 - Estructura de clase 01
- `c01-chat-app-start`
- `steps/step-1`
- `c01-chat-app-end`
- Cambio guiado: start -> end

## Slide 7 - Practica guiada
- Clonar repositorio del curso:
  - `git clone https://github.com/matmatys/programacion_III_UTN.git`
- Entrar al proyecto de la clase:
  - `cd programacion_III_UTN/utn-utnito/course/class-01-setup-hello-world/c01-chat-app-start`
- Abrir `c01-chat-app-start`
- `npm install`
- Play/F5 en Run and Debug
- Copiar archivos de `steps/step-1`
- Si algo falla, limpiar e instalar de nuevo:
  - `rm -rf node_modules .angular dist && npm install`

## Slide 8 - Resultado esperado
- Aplicacion visible en `http://localhost:5300`
- Pantalla final "Hello UTNito"

## Slide 9 - Cierre
- Checklist de clase
- Template para consultas en foro
- Proxima clase: HTML layout del chat
