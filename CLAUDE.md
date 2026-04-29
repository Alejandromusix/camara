# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Servidor backend (Express):**
```bash
cd contacto/back
npm run dev   # nodemon — recarga al editar server.js, HTML o CSS
npm start     # producción
```

**Frontend:** No hay build step. Sirve directamente con Live Server (puerto 5501 configurado en `.vscode/settings.json`) o cualquier servidor HTTP estático desde la raíz del repositorio.

## Arquitectura

Sitio web estático multi-página con un backend Express incompleto que aún no está integrado.

**Frontend (GitHub Pages, rama `main`):**
- Cada página vive en su propio directorio (`/quienes-somos/`, `/contacto/`, `/preguntas-frecuentes/`, `/registro/`, `/gracias/`) como `index.html` independiente.
- `script.js` y `styles.css` en la raíz son compartidos por todas las páginas; cada `index.html` los referencia con rutas relativas (`../script.js`, `../styles.css`).
- Tailwind CSS se carga desde CDN. Sin pasos de compilación.
- El formulario de contacto en `/contacto/index.html` apunta a **FormSubmit.co** — la solución funcional actual para envíos de email, no al backend Express.

**Backend (`/contacto/back/server.js`):**
- Express con un endpoint `POST /send-email`.
- Estado: **incompleto y no integrado**. Problemas conocidos: la URL de reCAPTCHA está vacía, falta llamar a `.json()` en la respuesta del verify.
- Variables de entorno esperadas en `/contacto/back/.env`: `RECAPTCHA_SECRET_KEY`, `PORT` (default 3000).
- El directorio `public/` que sirve estáticamente no existe aún.

**Decisión de diseño clave:** La paleta de colores está definida como variables CSS en `styles.css` (`--dark-green: #0D2B25`, `--gold: #C6A15B`, `--sand: #F5F0E8`). Mantener consistencia con estas variables al agregar estilos.
