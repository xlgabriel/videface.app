# Instrucciones para agentes (videface.app)

## 1) Stack, bootstrap y rutas reales
- SPA con **Vite + React 18 + React Router v6**.
- Entrada principal: `src/main.jsx` (monta `BrowserRouter` y renderiza `App`).
- Enrutamiento real en `src/App.jsx`.

Rutas actuales:
- `/*` → `Home`
- `/pricing` → `PricingPage`
- `/kiosk` → `VidefaceKiosk`
- `/key-management` → `VidefaceSmartLocker`
- `/keydrop` → `Keydrop`
- `/form` → `Form`
- `/thank-you` → `ThankYou`

## 2) Comandos de desarrollo
- Instalar: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`

## 3) Convenciones de navegación
- Home usa `/*` como catch-all.
- Menú principal y links globales se mantienen desde `src/constants/index.js` (`navigation`) y `src/components/Header.jsx`.
- Para anchors internos (ej. contacto) mantener comportamiento consistente entre páginas.
- `Button` por defecto debe dirigir a `#contact` en la página actual, salvo que se pase `href` explícito.

## 4) Estructura de componentes (reutilización para subpáginas)

### 4.1 Base global (`src/components/`)
- Layout/estructura: `Section.jsx`, `Heading.jsx`, `Tagline.jsx`.
- Navegación y shell: `Header.jsx`, `Footer.jsx`, `ScrollToTop.jsx`, `Announcement.jsx`.
- CTAs/UI: `Button.jsx`, `Notification.jsx`, `Questions.jsx`.
- Contacto: `Contact.jsx`, `ContactEmailTemplate.jsx`, `Form.jsx`.
- SEO/fondo: `Seo.jsx`, `DottedBackground.jsx`.
- Pricing reutilizable: carpeta `src/components/pricing/`.
- Productos reutilizable: carpeta `src/components/Products/`.

### 4.2 Home (`src/components/pages/home/`)
- `Home.jsx` orquesta secciones.
- Secciones en `sections/` (Hero, Experiences, IndustrySection, Services, Testimonials).
- Componentes internos en `homeComponents/` (cards, carousels, gallery, stats).
 - Nota: Las carpetas `sections/` dentro de `src/components/pages/...` contienen bloques/"secciones" que funcionan como componentes reutilizables y, en este proyecto, **se reutilizan ampliamente en las subpáginas**.
   - Trátalas como componentes desde el principio: si una sección puede ser usada en otras páginas, promuévela directamente a `src/components/`.
   - Regla práctica: Si una sección se usará en 2+ páginas, moverla a `src/components/` y exponerla como componente reutilizable.
   - Mantén en `sections/` solo las secciones estrictamente específicas de una sola página.

### 4.3 Otras páginas
- Kiosk: `src/components/pages/kiosk/`
- Smart Locker: `src/components/pages/SmarLocker/`
- Keydrop: `src/components/pages/keydrop/`
- Página de agradecimiento: `src/components/pages/ThankYou.jsx`

Regla de reutilización:
- Si el componente sirve a **2+ páginas**, promoverlo a `src/components/`.
- Si es específico de una página, mantenerlo dentro de su carpeta `pages/...`.

## 5) Estilos y design system
- Tailwind + utilidades globales definidas en `tailwind.config.js` y `src/index.css`.
- Reusar tokens existentes (`colors`, tipografías, utilidades `.container`, `.h1..h6`, `.body-*`, `.button`).
- Evitar colores/sombras hardcodeadas nuevas si ya existe un token o clase equivalente.
- Mantener responsive con breakpoints Tailwind; evitar CSS ad-hoc innecesario.

## 6) Animaciones (actualizado: SIN framer-motion)
- **No usar `framer-motion`** en este proyecto.
- Para animaciones usar:
  - Transiciones/`@keyframes` CSS.
  - Patrones scroll-driven con `requestAnimationFrame` + clamp/easing.
  - Respeto de `prefers-reduced-motion` cuando aplique.
- Referencias de patrón:
  - `src/components/pages/home/sections/Hero.jsx`
  - `src/components/pages/home/sections/Experiences.jsx`
  - `src/components/Contact.jsx`

## 7) Íconos y assets
- Íconos por máscara en `src/assets/svg-icons.css` (`.icon-*` con `bg-current`).
- Usar con clases `text-*` para color.
- Assets centralizados en `src/assets/index.js` como named exports cuando sea posible.
- Galería: `ImageGallery.jsx` usa `import.meta.glob` desde `src/assets/gallery/` con orden numérico por filename.

## 8) Datos y constantes
- Copys/listas en `src/constants/*.js`.
- Evitar hardcodear texto repetitivo dentro de componentes si puede ir a constantes.

## 9) SEO, analytics y contacto
- SEO por página con `src/components/Seo.jsx`.
- Analytics global: `usePageView()` se llama una vez en `src/App.jsx`.
- Contacto en `src/components/Contact.jsx`:
  - Render de email HTML con `ReactDOMServer.renderToString(ContactEmailTemplate)`.
  - `POST` al backend de emails con el shape de payload existente.

## 10) Reglas para cambios de agentes
- Hacer cambios pequeños, coherentes con el estilo actual.
- Priorizar reutilización sobre duplicación.
- No introducir nuevas librerías si el problema se resuelve con stack actual.
- Si se modifica navegación/rutas, validar impactos en `Header`, `constants` y botones CTA.
- Si se agrega una nueva subpágina:
  1. Crear componente en `src/components/pages/<pagina>/`.
  2. Registrar ruta en `src/App.jsx`.
  3. Conectar entrada de navegación si aplica.
  4. Añadir `Seo` específico de página.
