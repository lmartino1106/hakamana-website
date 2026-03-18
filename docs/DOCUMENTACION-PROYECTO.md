# Hakamana Website — Documentacion Tecnica Completa

**Proyecto:** Reconstruccion del sitio web hakamana.cl
**Periodo:** Marzo 2026
**Equipo:** Luca Martino + Claude Code (Opus 4.6)

---

## 1. Resumen del Proyecto

Reconstruccion completa del sitio web de Hakamana (Fondo de Litigacion chileno) desde WordPress a una aplicacion moderna en Next.js, desplegada en Vercel.

**Sitio anterior:** WordPress en hakamana.cl/cms/
**Sitio nuevo:** Next.js 16 + Tailwind CSS 4 + Framer Motion, desplegado en Vercel

---

## 2. Stack Tecnologico

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Next.js | 16.1.6 | Framework principal (App Router) |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Tipado estatico |
| Tailwind CSS | 4.x | Estilos |
| Framer Motion | 12.36.0 | Animaciones |
| next-intl | 4.8.3 | Internacionalizacion (ES/EN) |
| Supabase | 2.99.1 | Base de datos + Storage (CMS prensa) |
| Resend | 6.9.3 | Envio de emails (formulario contacto) |
| Zod | 4.3.6 | Validacion de datos |
| Sharp | 0.34.5 | Optimizacion de imagenes |
| Vercel | - | Hosting + CI/CD |

---

## 3. Estructura del Proyecto

```
hakamana-project/website/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Layout raiz
│   │   ├── robots.ts                     # robots.txt (incluye bots IA)
│   │   ├── sitemap.ts                    # Sitemap XML automatico
│   │   ├── api/contact/route.ts          # API formulario contacto
│   │   └── [locale]/                     # Rutas con i18n (es/en)
│   │       ├── layout.tsx                # Layout con metadata + JSON-LD
│   │       ├── page.tsx                  # Inicio
│   │       ├── quienes-somos/page.tsx    # Quienes Somos
│   │       ├── nuestro-equipo/
│   │       │   ├── page.tsx              # Listado equipo
│   │       │   └── [slug]/page.tsx       # Pagina individual miembro
│   │       ├── que-hacemos/page.tsx      # Que Hacemos
│   │       ├── prensa/page.tsx           # Prensa (conectado a Supabase)
│   │       ├── preguntas-frecuentes/     # FAQ
│   │       ├── contacto/page.tsx         # Contacto
│   │       ├── politica-de-privacidad/   # Politica privacidad
│   │       └── terminos-y-condiciones/   # T&C
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx                # Navegacion + switcher idioma
│   │   │   ├── Footer.tsx                # Pie de pagina
│   │   │   └── CookieBanner.tsx          # Banner cookies (Ley 21.719)
│   │   ├── sections/
│   │   │   ├── Hero.tsx                  # Hero animado
│   │   │   ├── TeamGrid.tsx              # Grid de equipo
│   │   │   ├── PressGrid.tsx             # Grid de prensa
│   │   │   ├── ProcessSteps.tsx          # Pasos del proceso
│   │   │   └── AnimatedSection.tsx       # Wrapper animacion
│   │   ├── seo/
│   │   │   └── JsonLd.tsx                # Schemas JSON-LD
│   │   └── ui/
│   │       ├── Logo.tsx                  # Logo SVG
│   │       ├── Accordion.tsx             # FAQ accordion
│   │       └── ContactForm.tsx           # Formulario contacto
│   ├── i18n/
│   │   ├── routing.ts                    # Config rutas i18n
│   │   ├── request.ts                    # Config servidor i18n
│   │   └── navigation.ts                # Helpers navegacion
│   ├── lib/
│   │   ├── constants.ts                  # Datos estaticos (equipo, prensa, FAQ)
│   │   ├── locale-content.ts             # Funciones contenido por idioma
│   │   ├── supabase.ts                   # Cliente Supabase compartido
│   │   └── press-service.ts              # Servicio prensa (Supabase + fallback)
│   ├── styles/globals.css                # Estilos globales
│   └── middleware.ts                     # Middleware next-intl
├── messages/
│   ├── es.json                           # Traducciones espanol
│   └── en.json                           # Traducciones ingles
├── public/
│   ├── images/                           # Imagenes del sitio
│   ├── llms.txt                          # Archivo para crawlers IA
│   ├── manifest.json                     # PWA manifest
│   └── icon.svg                          # Favicon SVG
├── supabase/
│   └── create-prensa-table.sql           # Migracion tabla prensa
├── docs/
│   ├── DOCUMENTACION-PROYECTO.md         # Este archivo
│   └── GUIA-PRENSA-CMS.md               # Guia para publicar noticias
├── next.config.ts                        # Config Next.js
├── vercel.json                           # Config Vercel (redirects, headers)
├── package.json
└── .env.local                            # Variables de entorno
```

---

## 4. Paginas y Rutas

| Ruta (ES) | Ruta (EN) | Descripcion |
|-----------|-----------|-------------|
| `/` | `/en` | Pagina de inicio |
| `/quienes-somos` | `/en/about-us` | Acerca de Hakamana |
| `/nuestro-equipo` | `/en/our-team` | Listado del equipo |
| `/nuestro-equipo/[slug]` | `/en/our-team/[slug]` | Pagina individual de cada miembro |
| `/que-hacemos` | `/en/what-we-do` | Servicios y proceso |
| `/preguntas-frecuentes` | `/en/faq` | Preguntas frecuentes |
| `/prensa` | `/en/press` | Noticias de prensa (CMS Supabase) |
| `/contacto` | `/en/contact` | Formulario de contacto |
| `/politica-de-privacidad` | `/en/privacy-policy` | Politica de privacidad |
| `/terminos-y-condiciones` | `/en/terms-and-conditions` | Terminos y condiciones |

---

## 5. Integraciones Externas

### 5.1 Supabase

**URL:** https://olngvmszddmwkrjelkrr.supabase.co
**Dashboard:** https://supabase.com/dashboard/project/olngvmszddmwkrjelkrr

**Tablas:**
- `contactos` — Almacena consultas del formulario de contacto (nombre, email, telefono, empresa, mensaje)
- `prensa` — Articulos de prensa/noticias (CMS dinamico)

**Storage:**
- Bucket `prensa` — Imagenes de articulos de prensa (publico, max 5MB, JPG/PNG/WebP/GIF)
- URL base imagenes: `https://olngvmszddmwkrjelkrr.supabase.co/storage/v1/object/public/prensa/`

**Variables de entorno requeridas:**
```
NEXT_PUBLIC_SUPABASE_URL=https://olngvmszddmwkrjelkrr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[service role key - JWT]
```

### 5.2 Resend (Email)

**Proposito:** Enviar notificaciones por email cuando alguien completa el formulario de contacto.
**Destino:** contacto@hakamana.cl
**Remitente actual:** onboarding@resend.dev (temporal hasta verificar dominio hakamana.cl en Resend)

**Variable de entorno:**
```
RESEND_API_KEY=[api key de Resend]
```

**Pendiente:** Verificar dominio hakamana.cl en Resend para enviar desde noreply@hakamana.cl

### 5.3 Vercel

**Proyecto:** website
**Team:** lmartino1106-3471s-projects
**Project ID:** prj_jbCdCESSYlzYZXyR7NFRkBerpMxo
**Repo conectado:** github.com/lmartino1106/hakamana-website (rama: master)
**Production branch:** master

**Dominios configurados:**
- hakamana.cl
- www.hakamana.cl
- website-psi-one-72.vercel.app

**Headers de seguridad (vercel.json):**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- HSTS habilitado
- Permissions-Policy: camera, microphone, geolocation bloqueados

**Redirects permanentes:**
- /home → /
- /team → /nuestro-equipo
- /about → /quienes-somos
- /faq → /preguntas-frecuentes
- /contact → /contacto
- /press → /prensa
- /privacy → /politica-de-privacidad

---

## 6. SEO y Schemas Implementados

### 6.1 JSON-LD Schemas

| Schema | Ubicacion | Proposito |
|--------|-----------|-----------|
| Organization + LegalService + FinancialService | Layout global | Identidad de la empresa |
| LocalBusiness | Layout global | Datos de ubicacion fisica |
| FAQPage | /preguntas-frecuentes | Preguntas frecuentes para Google |
| BreadcrumbList | Todas las paginas internas | Navegacion estructurada |
| NewsArticle (con datePublished) | /prensa | Cada articulo con fecha de publicacion |
| SpeakableSpecification | Inicio, Prensa, Quienes Somos | Respuestas de voz (Alexa, Siri, Google) |

### 6.2 Metadata

- Title template con formato: `[Pagina] | Hakamana - Fondo de Litigacion`
- OpenGraph completo con imagen 1200x630
- Twitter Card (summary_large_image)
- Canonical URLs
- Alternate languages (es-CL, en-US)
- Keywords optimizadas (litigation funding, third party funding, arbitraje, etc.)

### 6.3 robots.txt

Bots permitidos:
- Googlebot (estandar)
- GPTBot (OpenAI)
- Claude-Web (Anthropic)
- anthropic-ai
- PerplexityBot
- Google-Extended
- Bytespider (TikTok)
- CCBot (Common Crawl)
- cohere-ai

Rutas bloqueadas: `/api/`, `/cms/`, `/_next/`

### 6.4 llms.txt

Archivo bilingue (ES/EN) en `public/llms.txt` con toda la informacion de la empresa optimizada para crawlers de modelos de lenguaje.

### 6.5 Sitemap

Generado automaticamente en `src/app/sitemap.ts`:
- Todas las paginas estaticas con alternates ES/EN
- Paginas individuales de equipo (9 miembros x 2 idiomas)
- Prioridades personalizadas (home: 1.0, contacto: 0.9, equipo: 0.8, etc.)

---

## 7. CMS de Prensa (Supabase)

### Arquitectura

```
[Dashboard Supabase] → [Tabla "prensa"] → [press-service.ts] → [prensa/page.tsx] → [hakamana.cl/prensa]
                         [Storage "prensa"] ↗ (imagenes)
```

### Flujo de datos

1. `press-service.ts` intenta leer de Supabase (tabla `prensa`)
2. Si Supabase no esta disponible o no hay datos, usa los datos estaticos de `constants.ts` como fallback
3. Los articulos se ordenan por fecha descendente
4. Solo se muestran articulos con `published = true`

### Tabla prensa (schema)

| Campo | Tipo | Requerido | Descripcion |
|-------|------|:---------:|-------------|
| id | SERIAL | Auto | ID autoincremental |
| slug | TEXT | Si | Identificador unico (ej: `nota-marzo-2025`) |
| title | TEXT | Si | Titulo en espanol |
| title_en | TEXT | Si | Titulo en ingles |
| source | TEXT | Si | Nombre del medio |
| date | DATE | Si | Fecha publicacion (YYYY-MM-DD) |
| excerpt | TEXT | Si | Resumen en espanol |
| excerpt_en | TEXT | Si | Resumen en ingles |
| image | TEXT | Si | URL de la imagen (local o Supabase Storage) |
| external_url | TEXT | No | Link al articulo original |
| published | BOOLEAN | Si | true = visible en el sitio |
| created_at | TIMESTAMPTZ | Auto | Fecha de creacion |

### Guia de uso

Ver `docs/GUIA-PRENSA-CMS.md` para instrucciones paso a paso dirigidas a usuarios no tecnicos.

---

## 8. Equipo (Miembros)

9 miembros con paginas individuales en `/nuestro-equipo/[slug]`:

| Miembro | Cargo | Slug |
|---------|-------|------|
| Francisco Orrego | Presidente del Directorio | francisco-orrego |
| Andres Veszpremy | Presidente Comite de Inversiones | andres-veszpremy |
| Carolina Plaza | Directora Ejecutiva | carolina-plaza |
| Aldo Diaz | Director Legal | aldo-diaz |
| Ciro Colombara | Director | ciro-colombara |
| Manuel Sotelo | Subdirector Legal | manuel-sotelo |
| Ignacio Canals | Director | ignacio-canals |
| Emma Fischer | Directora de Estrategia | emma-fischer |
| Luca Martino | Abogado TI y Nuevas Tecnologias | luca-martino |

Los datos del equipo estan en `src/lib/constants.ts` (estaticos). Cada miembro tiene bio bilingue y foto en `public/images/`.

---

## 9. Historial de Desarrollo

| Commit | Descripcion |
|--------|-------------|
| `294d3f7` | Commit inicial: sitio completo con todas las paginas |
| `7fdd64a` | Fix crash cliente: mover hook useTranslations fuera de JSX condicional |
| `f6a317a` | Logo SVG, fotos equipo correctas, nueva imagen hero |
| `bd75fa8` | Fix espaciado logo SVG |
| `3da297c` | Usar dominio test de Resend temporalmente |
| `ca35aee` | Logo oficial Hakamana V5 SVG (sin fondo) |
| `e923849` | Fix seccion reconocimientos, agregar OG image 1200x630 |
| `357b538` | Agregar logo Leaders League a reconocimientos |
| `a38ffb0` | Agregar Emma Fischer y Luca Martino al equipo |
| `d344fee` | Agregar foto Luca Martino |
| `5e1e6ed` | Remover segundo apellido Luca Martino |
| `ae186c6` | Fix UI, ortografia, SEO, unificar fotos equipo |
| `709596a` | CMS Supabase prensa, schemas NewsArticle/Speakable, llms.txt, bots IA |
| `99d14cf` | Supabase Storage para imagenes, guia CMS, next.config |

---

## 10. Incidente Vercel — Rama main (Vibe Kanban)

**Fecha:** 17 marzo 2026
**Problema:** Una herramienta externa (Vibe Kanban) creo una rama `main` en el repo con codigo completamente diferente. Vercel desplego esa rama a produccion, sobreescribiendo el sitio real de Hakamana.

**Solucion aplicada:**
1. Se cambio la default branch de GitHub de `main` a `master`
2. Se elimino la rama `main` del repositorio
3. Se ejecuto un deploy forzado a produccion desde `master` via Vercel CLI
4. Se cambio la Production Branch en Vercel Settings a `master`

**Prevencion:** La rama `main` ya no existe. Solo existe `master` como rama principal y de produccion.

---

## 11. Informacion de Dominio y DNS

- **Dominio principal:** hakamana.cl
- **Alias:** fondosdelitigacion.com
- **CPanel:** hakamana.cl:2083 (usuario: hakamana)
- **WordPress antiguo:** hakamana.cl/cms/wp-admin/ (usuario: lmartino@colombara.cl)

---

## 12. Variables de Entorno (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://olngvmszddmwkrjelkrr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[JWT service role key]
RESEND_API_KEY=[API key de Resend]
```

**Nunca commitear .env.local al repositorio.**

---

## 13. Pendientes y Recomendaciones

### Pendientes tecnicos
- [ ] Verificar dominio hakamana.cl en Resend (para enviar desde noreply@hakamana.cl)
- [ ] Configurar Google Search Console (reemplazar placeholder `XXXXXXXXXX` en layout.tsx)
- [ ] Rotar tokens expuestos en sesion de desarrollo (sbp_, service role key)

### Recomendaciones externas (no-codigo)
- [ ] Registrar Hakamana en Wikipedia o Wikidata
- [ ] Crear perfil en Crunchbase
- [ ] Crear LinkedIn Company Page
- [ ] Crear perfil en Bloomberg
- [ ] Publicar contenido nuevo de prensa (los articulos actuales son de 2019-2024)

---

## 14. Contacto del Proyecto

- **Desarrollador:** Luca Martino
- **Email:** lmartino@colombara.cl
- **GitHub:** github.com/lmartino1106
- **Empresa:** Hakamana - Fondo de Litigacion
- **Email empresa:** contacto@hakamana.cl
