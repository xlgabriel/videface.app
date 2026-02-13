# Instrucciones para agentes (videface.app)

## Stack y entrypoints
- App SPA con **Vite + React 18** y **React Router v6**.
- Bootstrap: `src/main.jsx` monta `BrowserRouter` y renderiza `App`.
- Rutas reales: `src/App.jsx` define `Routes` internas (Home/Products/Pricing/Kiosk/Form).

## Comandos de desarrollo
- Instalar: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`

## Convenciones de routing y navegación
- `src/main.jsx` enruta `/` y `/*` a `App`; dentro de `App` se decide la página.
- Home es el “catch-all” vía `<Route path="/*" element={<Home />}/>`; por eso links como `/home` funcionan.
- Para anchors dentro de Home se usa **HashLink** (e.g. `/home/#contact`) en `src/components/Header.jsx`.
- Menú: editar items en `src/constants/index.js` (`navigation`). Nota: `title: "Solutions"` con `url: null` NO es un link; el dropdown lo maneja `Header.jsx`.

## Componentes “base” a reutilizar
- Layout/secciones: `src/components/Section.jsx` (padding/crosses) y `src/components/Heading.jsx`.
- CTA/Button: `src/components/Button.jsx` (props `size`, `color`, `textColor`, `rounded`, `boxShadow`).
- Header con overlay + scroll lock: `src/components/Header.jsx` (usa `scroll-lock`).
- Fondo: `src/components/DottedBackground.jsx` (paper effect con backgroundPosition ligado a scroll).

## Estilos (Tailwind + utilidades del proyecto)
- Tokens/clases globales en `tailwind.config.js`:
  - Colores: `theme.extend.colors.color.*` y `colors.n.*`.
  - Clases de tipografía/layout: `.container`, `.h1..h6`, `.body-1`, `.body-2`, `.tagline`, `.button`.
- CSS global y animaciones reutilizables en `src/index.css`:
  - Entradas Hero: `.hero-left-enter`, `.hero-bg-enter`, `.hero-user-enter`, `.hero-gif-enter`
  - CTA sheen: `.hero-cta-btn`
  - Header drop: `.headerbar-enter`
  - Pricing glow: `.pricing-neon`
  - Cards “flag”: `.flag-in` + `.flag-in--play` (usa `--flag-delay`)
- Evita inventar nuevos estilos si ya existe una clase/animación equivalente arriba.

## Sistema de íconos (importante para reusar)
- `src/assets/svg-icons.css` define íconos por **mask-image** (`.icon-kiosk`, `.icon-key`, `.icon-user`, etc.).
- Se usan como `<span className="icon-kiosk text-[#0A6CFF]" />` y el color se controla con `text-*` (porque usa `bg-current`).

## Animaciones y motion (reusar patrones existentes)
- Patrón común “scroll-driven” con `requestAnimationFrame` + clamp/easing:
  - Ejemplos: `src/components/pages/home/sections/Hero.jsx`, `.../Experiences.jsx`, `src/components/Contact.jsx`.
  - Cuando agregues animaciones por scroll, copia este enfoque (rAF throttle + `prefers-reduced-motion` cuando aplique).
- **Framer Motion** se usa puntualmente en la galería:
  - `src/components/pages/home/homeComponents/ImageGallery.jsx` usa `AnimatePresence` + `motion.*` (transiciones cortas + lightbox).
- **Parallax**: `react-just-parallax` (`MouseParallax`) en `src/components/design/Hero.jsx`.

## Assets y data (constantes)
- Assets se importan como named exports desde `src/assets/index.js`.
- Datos/copy viven en `src/constants/*.js`.
- Galería: `ImageGallery.jsx` carga imágenes con `import.meta.glob` desde `src/assets/gallery/` y las ordena por número en el filename; agrega nuevas imágenes siguiendo ese patrón (e.g. `11.webp`).

## SEO, analytics e integración de contacto
- SEO por página: `src/components/Seo.jsx` (Helmet). Home lo usa en `src/components/pages/home/Home.jsx`.
- Analytics: `src/hooks/usePageView.js` se invoca una sola vez en `src/App.jsx` y envía `page_view` vía `window.gtag`.
- Contacto: `src/components/Contact.jsx`:
  - Genera HTML email con `ReactDOMServer.renderToString(ContactEmailTemplate)`.
  - Envía `POST` al backend (endpoint `.../emails/contact`) con un payload específico; mantén el shape si lo modificas.
