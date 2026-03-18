# Guia para Publicar Noticias de Prensa en Hakamana

## Acceso al Panel

1. Ir a **https://supabase.com/dashboard**
2. Iniciar sesion con la cuenta del proyecto
3. Seleccionar el proyecto **olngvmszddmwkrjelkrr**

---

## Paso 1: Subir la Imagen

1. En el menu lateral izquierdo, click en **Storage** (icono de carpeta)
2. Click en el bucket **"prensa"**
3. Click en **"Upload files"** (boton verde arriba a la derecha)
4. Seleccionar la imagen desde tu computador
   - Formatos permitidos: JPG, PNG, WebP, GIF
   - Tamano maximo: 5 MB
   - Recomendacion: imagenes de al menos 800x500px
5. Una vez subida, click en la imagen
6. Click en **"Get URL"** (o copiar URL publica)
7. La URL tendra este formato:
   ```
   https://olngvmszddmwkrjelkrr.supabase.co/storage/v1/object/public/prensa/nombre-archivo.jpg
   ```
8. **Copiar esta URL** — la necesitaras en el paso 2

---

## Paso 2: Crear el Articulo de Prensa

1. En el menu lateral izquierdo, click en **Table Editor** (icono de tabla)
2. Seleccionar la tabla **"prensa"**
3. Click en **"Insert row"** (boton verde arriba a la derecha)
4. Llenar los campos:

| Campo | Que poner | Ejemplo |
|-------|-----------|---------|
| `slug` | Identificador unico, sin espacios ni tildes, separado por guiones | `hakamana-premio-2025` |
| `title` | Titulo en espanol | `Hakamana recibe premio innovacion 2025` |
| `title_en` | Titulo en ingles | `Hakamana receives innovation award 2025` |
| `source` | Nombre del medio | `El Mercurio Legal` |
| `date` | Fecha de publicacion (formato YYYY-MM-DD) | `2025-06-15` |
| `excerpt` | Resumen corto en espanol (1-2 oraciones) | `Hakamana fue galardonado con el premio...` |
| `excerpt_en` | Resumen corto en ingles | `Hakamana was awarded the prize...` |
| `image` | URL de la imagen (copiada en Paso 1) | `https://olngvmszddmwkrjelkrr.supabase.co/storage/v1/object/public/prensa/premio-2025.jpg` |
| `external_url` | (Opcional) Link al articulo original | `https://elmercurio.com/articulo/...` |
| `published` | Marcar como `true` para que aparezca en el sitio | `true` |

5. Click en **"Save"**
6. El articulo aparecera automaticamente en **hakamana.cl/prensa** (sin necesidad de tocar codigo)

---

## Paso 3: Verificar

1. Ir a **https://www.hakamana.cl/prensa**
2. El nuevo articulo deberia aparecer ordenado por fecha (los mas recientes primero)
3. Si no aparece, verificar que `published` este en `true`

---

## Editar un Articulo Existente

1. Ir a **Table Editor > prensa**
2. Click en la fila del articulo que quieres editar
3. Modificar los campos necesarios
4. Click en **"Save"**
5. Los cambios se reflejan automaticamente en el sitio

---

## Eliminar un Articulo

**Opcion A — Ocultar (recomendado):**
1. Ir a **Table Editor > prensa**
2. Click en la fila del articulo
3. Cambiar `published` a `false`
4. El articulo deja de aparecer pero no se pierde

**Opcion B — Eliminar permanentemente:**
1. Click en la fila del articulo
2. Click en **"Delete"**
3. Confirmar

---

## Reemplazar una Imagen

1. Ir a **Storage > prensa**
2. Subir la nueva imagen (puede tener el mismo nombre para reemplazar)
3. Si el nombre es diferente, actualizar el campo `image` en la tabla

---

## Consejos

- **Slug:** Usar solo letras minusculas, numeros y guiones. Ejemplo: `nota-diario-financiero-marzo-2025`
- **Imagenes:** Usar formato JPG o WebP para mejor rendimiento. Tamano ideal: 800x500px
- **Fechas:** Siempre usar formato `YYYY-MM-DD` (ano-mes-dia). Ejemplo: `2025-03-17`
- **published:** Puedes crear articulos con `published = false` como borradores y publicarlos despues cambiando a `true`
- **external_url:** Si el articulo tiene link al medio original, ponerlo ahi. Si no tiene, dejar vacio

---

## Campos Obligatorios

| Campo | Obligatorio |
|-------|:-----------:|
| slug | Si |
| title | Si |
| title_en | Si (poner al menos algo en ingles) |
| source | Si |
| date | Si |
| excerpt | Si |
| excerpt_en | Si |
| image | Si |
| external_url | No |
| published | Si (default: true) |

---

## Soporte

Si algo no funciona, contactar a Luca Martino: lmartino@colombara.cl
