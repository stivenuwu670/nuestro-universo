# Nuestro Universo V3 — Steven y Ashley
### Universe × Rosita · Un regalo de cumpleaños y aniversario

Experiencia web romántica de seis capítulos construida con **HTML, CSS y JavaScript**. Usa Three.js para las estrellas cuando hay conexión y admite una alternativa Canvas sin conexión. No necesita Node.js, base de datos ni compilación.

## 1. Abrir el proyecto

1. Descomprime el ZIP. Entra a la carpeta `Nuestro_Universo_V3`.
2. Abre la carpeta en Visual Studio Code.
3. Si aún no la tienes, instala **Live Server**, extensión de Ritwick Dey.
4. Haz clic derecho sobre `index.html` → **Open with Live Server**.
5. El navegador abrirá una dirección local, normalmente `http://127.0.0.1:5500/`.

**Importante:** extrae el ZIP antes de usarlo. No ejecutes el HTML directamente dentro de la carpeta comprimida.

## 2. Qué incluye la versión 3

| Capítulo | Contenido |
|---|---|
| 01 — Bienvenida | Pantalla cinematográfica con planeta, estrellas 3D y fotos reales de Roblox y de su vida juntos. |
| 02 — Nuestra historia | Seis recuerdos destacados, línea de tiempo, **álbum de 48 fotografías** (19 de Roblox y 29 de otros momentos) y **9 videos reproducibles**. |
| 03 — Nuestro universo | Constelación de seis estrellas interactivas. |
| 04 — Cartas | Mensaje original de **2023**, carta de **2025** y una propuesta de dedicatoria para **2026**. |
| 05 — Sorpresas | Tres regalos, un recuerdo romántico y el reto de elegir nuestra canción especial entre ocho títulos. |
| 06 — Final | Dedicatoria, fotos de Roblox a la vida real, contador y lluvia de estrellas. |

En el capítulo 2, pulsa **«Abrir todos nuestros recuerdos»**. Los filtros permiten visualizar todas las fotos, solo Roblox o solo vida real. Al pulsar una foto o un video, se abre un visor que permite avanzar y retroceder. En celular también puedes deslizar.

Los archivos originales se conservaron por su nombre en `assets/catalogo.json` como referencia. Las fotos del sitio están convertidas a WebP para ahorrar espacio, y los nueve videos a MP4 para facilitar la reproducción en navegadores.

## 3. Ajustes personales

En `app.js` busca el bloque `const CONFIG = { ... }`:

- `nombre`: nombre para Ashley.
- `nombreReal`: Steven.
- `nombreJuego`: Universe.
- `nombreJuegoElla`: Rosita.
- `fechaInicio`: actualmente `2023-11-12T00:00:00`, **fecha del primer mensaje**, no una fecha oficial de noviazgo confirmada.
- `fraseFinal`: dedicatoria final.
- `recuerdos`: los seis recuerdos principales (títulos, textos y portadas).
- `estrellas`: textos de la constelación.

Las cartas completas están en **`cartas.js`**. La carta de 2026 es una propuesta editable; las de 2023 y 2025 contienen los textos facilitados para el regalo.

## 4. Música

La web ya tiene una **melodía ambiental original**, que empieza al pulsar el botón «Música». Los nombres Billie Eilish, Los Retro y *Labios de Cereza 2* figuran como referencias de los gustos musicales de Ashley, pero **no se adjuntan grabaciones comerciales** porque no se enviaron archivos de audio de esas canciones.

Dos opciones para usar música personal:

**Solo en la sesión actual:** en el capítulo 4 pulsa «Elegir audio desde tu dispositivo» y elige un MP3. La canción se escuchará en tu navegador, pero NO se guardará para Ashley ni seguirá disponible al recargar.

**Para que Ashley lo escuche desde el enlace publicado:**

1. Añade a `assets/musica/` un archivo musical que tengas derecho a utilizar, por ejemplo `cancion.mp3`.
2. En `app.js`, cambia `musica: ""` a `musica: "assets/musica/cancion.mp3"`.
3. Guarda y vuelve a cargar el navegador.
4. El botón de música reproducirá ese archivo. Los navegadores exigen una interacción antes de iniciar audio con sonido.

## 5. Compartirlo por GitHub Pages

**Recomendado: crear un repositorio nuevo**, en vez de sustituir el regalo anterior `misosa`.

1. En GitHub pulsa **New repository** y elige un nombre, por ejemplo `nuestro-universo`.
2. Sube todos los archivos de esta carpeta a la **raíz** de la rama `main`: `index.html`, los `.js`, `styles.css` y la carpeta `assets/`.
3. En el repositorio abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**, elige `main` y `/(root)` y guarda.
5. GitHub mostrará una URL parecida a `https://TU-USUARIO.github.io/nuestro-universo/`.
6. Prueba esa URL en un celular antes de compartirla con Ashley.

El sitio pesa aproximadamente **43 MB**, porque contiene los 9 videos, por lo que una buena conexión mejora la primera carga. Los videos no se descargan todos al entrar: se cargan cuando se abren.

### Privacidad importante

GitHub Pages normalmente hace públicos los archivos del sitio desplegado. **Cualquier persona que consiga el enlace podrá acceder a las fotos, videos y cartas**, y estos archivos no estarán protegidos solo por no compartir el link. Si hay recuerdos que prefieren mantener privados, retíralos antes de publicarlos o usa una plataforma de acceso restringido. Se recomienda pedir el consentimiento de las personas que salen en las fotos si el sitio será público.

## 6. Estructura del proyecto

```text
Nuestro_Universo_V3/
├── index.html            ← inicia aquí
├── styles.css            ← apariencia y animaciones
├── app.js                ← seis capítulos y CONFIG
├── cartas.js             ← cartas de 2023, 2025 y 2026
├── archivo.js            ← lista de los 48 archivos y 9 videos
├── archivo-ui.js         ← filtros, tarjetas, visor y navegación
├── space.js              ← fondo de estrellas 3D y Canvas
├── assets/
│   ├── fotos/            ← 48 fotografías optimizadas
│   ├── videos/           ← 9 videos MP4
│   ├── portadas/         ← imágenes previas de los videos
│   ├── musica/           ← coloca aquí tu MP3 autorizado
│   └── catalogo.json     ← nombres originales y referencias
└── README.md
```

Diseñado para escritorio y dispositivos móviles. No depende de servicios externos para el contenido personal: solo el efecto Three.js y las fuentes web intentan descargarse desde Internet; tienen alternativas locales.


## Actualización V3.2 — Música y sorpresa
- La trivia sobre los nombres de Roblox fue sustituida por un recuerdo romántico interactivo con una fotografía.
- La lista de reproducción solo muestra las cinco pistas seleccionadas por Steven.
- Los archivos musicales no están incluidos en el repositorio y deben colocarse, si se tienen los derechos para publicarlos, en \`assets/musica/\` con estos nombres:
  1. \`01-recuerdo-especial.mp3\` (archivo compartido como «m»)
  2. \`02-labios-de-cereza-2.mp3\`
  3. \`03-my-love-mine-all-mine.mp3\`
  4. \`04-tu-sancho.mp3\`
  5. \`05-wildflower.mp3\`
- El reproductor no reproduce música generada ni otras pistas y avanza automáticamente a la siguiente canción.
- Por las restricciones de los navegadores, la reproducción comienza después de una interacción del visitante.

**Derechos de autor:** Publicar grabaciones comerciales en GitHub Pages requiere permiso o licencia. No se recomienda alojar archivos sin autorización en un repositorio público.


## Actualización V3.3 — La canción de Universe y Rosita
El capítulo 05 incluye una nueva sorpresa con ocho canciones. La respuesta correcta es **Someone to Spend Time With — Los Retros**. Cuando Ashley la elija se mostrará una dedicatoria con fotografía y contará como el cuarto regalo para desbloquear el final.

La selección musical del capítulo 04 contiene estas ocho canciones:
1. Pista que me compartiste (el audio m.mp3, todavía sin título confirmado)
2. Labios de Cereza 2 — T3R Elemento
3. My Love Mine All Mine — Mitski
4. Tu Sancho — Fuerza Regida
5. WILDFLOWER — Billie Eilish
6. Mama's Boy — Dominic Fike
7. Someone to Spend Time With — Los Retros
8. Dame Amor — Officialalex425

El sitio integra enlaces y reproductores de YouTube oficiales para las siete canciones identificadas. Los reproductores pueden requerir pulsar Play dentro del video, especialmente en celular, o abrir el enlace oficial si el video bloquea la incrustación. No se alojan grabaciones comerciales en este repositorio. La pista sin título confirmado solo puede reproducirse como audio local si su archivo está disponible y se cuenta con autorización para usarla.


## Actualización V3.5 — Fotografías, universo y canciones
- **Capítulo 02:** el visor de los seis recuerdos y el álbum de 48 fotografías muestran cada imagen completa sin cortar personas ni bordes. Se puede avanzar y retroceder por el álbum con los botones (o gestos táctiles).
- **Capítulo 03:** constelación renovada con planeta decorativo, seis recuerdos con sus fotografías, avance entre estrellas e indicador de exploración. Es adaptable a móvil.
- **Capítulo 05:** el regalo de la canción muestra otra foto de la vida real (`assets/fotos/vida-20.webp`). Al tocar una respuesta, el reproductor flotante cambia a esa canción y solicita su reproducción. La opción correcta sigue siendo *Someone to Spend Time With* de Los Retros y la canción continúa sonando después de acertar.
- **Compatibilidad de música:** los temas identificados se sirven mediante sus reproductores de YouTube; algunos navegadores y videos no permiten autoplay con sonido, incluso tras tocar una opción. En ese caso se pulsa Play dentro del reproductor. El primer audio personal aún no está alojado en la web, por lo que esa opción no puede sonar hasta disponer de una fuente autorizada.
