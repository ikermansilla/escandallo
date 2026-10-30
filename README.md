# Escandallo de mezclas

Calculadora de escandallo y costes para mezclas de piensos y cereales.
Se instala en el móvil como una app y funciona sin internet.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app (diseño, cálculos y guardado de precios) |
| `manifest.json` | Nombre, colores e icono de la app |
| `sw.js` | Hace que funcione sin internet |
| `icon-192.png`, `icon-512.png` | Icono para Android |
| `apple-touch-icon.png` | Icono para iPhone |

## Publicarla gratis con GitHub Pages

1. Crea una cuenta en https://github.com (si no la tienes).
2. Arriba a la derecha pulsa **+ → New repository**. Nombre: `escandallo`. Marca **Public** y pulsa **Create repository**.
3. En la página del repositorio vacío pulsa el enlace **uploading an existing file**.
   Arrastra los archivos sueltos (no la carpeta) y pulsa **Commit changes**.
4. Ve a **Settings → Pages**. En *Build and deployment*: Source = **Deploy from a branch**,
   Branch = **main** y carpeta **/ (root)**. Pulsa **Save**.
5. Espera unos minutos. La app quedará en:
   `https://TU-USUARIO.github.io/escandallo/`

## Instalarla en el móvil

- **Android (Chrome):** abre la dirección y pulsa el botón **Instalar** que aparece en la app,
  o el menú ⋮ → **Instalar aplicación** / **Añadir a pantalla de inicio**.
- **iPhone (Safari):** abre la dirección, pulsa **Compartir** (cuadrado con flecha) →
  **Añadir a pantalla de inicio** → **Añadir**.

Después ábrela siempre desde su icono. La primera vez pon los precios dentro de la app instalada
(en iPhone, la app instalada no comparte datos con Safari).

## Actualizarla más adelante

1. Cambia lo que quieras en `index.html`.
2. En `sw.js` cambia `VERSION = 'escandallo-v1'` por `'escandallo-v2'` (y así sucesivamente).
3. Sube los dos archivos a GitHub (Add file → Upload files → Commit changes).
4. En el móvil, abre la app con internet, ciérrala y vuelve a abrirla: ya tendrás la versión nueva.
   Los precios y el historial se conservan.
