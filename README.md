# Humano de Estrellas

**El origen cósmico de tu cuerpo.**

> *Ningún átomo de tu cuerpo se fabricó en la Tierra.*

Una página web interactiva que muestra una silueta humana junto a la tabla
periódica completa, destaca los elementos químicos que forman el cuerpo humano
y los agrupa por colores según el evento astronómico que los fabricó: el Big
Bang, el ciclo CNO de estrellas como el Sol, las supernovas, la colisión de dos
estrellas de neutrones…

Cada evento tiene su propia animación CSS, su propio sonido sintetizado en
tiempo real y su lugar en una línea del tiempo de 13 800 millones de años.

🇬🇧 [Read this in English](./README.en.md)

---

## Índice

- [Qué hace](#qué-hace)
- [Puesta en marcha](#puesta-en-marcha)
- [Cómo funciona](#cómo-funciona)
  - [Los siete orígenes](#los-siete-orígenes)
  - [La silueta](#la-silueta)
  - [Las animaciones](#las-animaciones)
  - [El sonido](#el-sonido)
  - [Los idiomas](#los-idiomas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo añadir o corregir datos](#cómo-añadir-o-corregir-datos)
- [Accesibilidad](#accesibilidad)
- [Compatibilidad](#compatibilidad)
- [Despliegue](#despliegue)
- [Fuentes](#fuentes)
- [Licencia](#licencia)

---

## Qué hace

| | |
|---|---|
| **Silueta interactiva** | Al pasar el cursor por un elemento, se iluminan las regiones del cuerpo donde vive: los huesos con el calcio, la sangre con el hierro, la tiroides con el yodo. El corazón late, los pulmones respiran, la sangre fluye. |
| **Tabla periódica completa** | Los 118 elementos. Los 30 que forman tu cuerpo brillan con el color de su origen; el resto queda en penumbra. Se puede filtrar para ver sólo los del cuerpo. |
| **Leyenda de siete orígenes** | Cada catástrofe cósmica con su color, su animación CSS, cuándo ocurrió, cuánto duró y qué elementos tuyos salieron de ahí. |
| **Línea del tiempo** | Los catorce hitos que tuvieron que ocurrir —desde el Big Bang hasta la aparición del ser humano— para que existas. |
| **Sonido original** | Ambiente, melodía y siete efectos, todos sintetizados en el navegador. Cero archivos de audio. |
| **Bilingüe** | Español (principal) e inglés, conmutable en caliente. |

---

## Puesta en marcha

Requisitos: **Node.js 18 o superior**.

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar el servidor de desarrollo
npm run dev          # http://localhost:5173

# 3. Compilar para producción
npm run build        # genera dist/

# 4. Previsualizar la compilación
npm run preview
```

No hay ningún otro paso: no hay claves de API, ni variables de entorno, ni
recursos externos que descargar.

---

## Cómo funciona

### Los siete orígenes

Todo el proyecto gira alrededor de una idea: **cada elemento químico tiene una
partida de nacimiento astronómica**. La asignación de un origen dominante a
cada elemento sigue de forma aproximada el trabajo divulgativo de
[Jennifer A. Johnson](https://blog.sdss.org/2017/01/09/origin-of-the-elements-in-the-solar-system/)
(Ohio State University, 2017).

| Color | Evento | Qué fabrica | Cuándo |
|---|---|---|---|
| 🩵 Cian | **Big Bang** | Hidrógeno, helio, litio | T + 3 minutos, hace 13 800 millones de años |
| 💜 Violeta | **Rayos cósmicos** | Berilio, boro | Continuamente, aún hoy |
| 🟡 Ámbar | **Estrellas moribundas de baja masa** | Carbono, nitrógeno (ciclo CNO y proceso-s) | De 1000 a 10 000 millones de años por estrella |
| 🔴 Rojo | **Estrellas masivas que explotan** | Oxígeno, magnesio, silicio, calcio | Colapso en menos de 1 segundo |
| ⚪ Blanco | **Enanas blancas que explotan** | Hierro, níquel, cromo | Detonación en 2 segundos |
| 🩷 Rosa | **Fusión de estrellas de neutrones** | Yodo, selenio, oro, uranio (proceso-r) | Fusión en 100 milisegundos |
| 🟢 Verde | **Fabricados por humanos** | Tecnecio, plutonio, oganesón | Microsegundos en un acelerador |

Los datos viven en [`src/data/origins.js`](src/data/origins.js), con la
descripción de cada evento, su color, su momento en la historia y el texto que
explica qué parte de tu cuerpo le debes.

### La silueta

[`src/components/BodySilhouette.jsx`](src/components/BodySilhouette.jsx) dibuja
un cuerpo humano con SVG, compuesto por once formas (cabeza, torso, brazos,
piernas, manos, pies). Esas mismas formas se reutilizan tres veces:

1. como **relleno** con un degradado radial oscuro;
2. como **`clipPath`**, para recortar dentro del cuerpo un cielo estrellado
   (noventa estrellas que parpadean: eres literalmente un trozo de universo);
3. como **contorno luminoso** cuando se resalta la piel.

Encima se superponen trece regiones anatómicas —esqueleto, sangre, músculos,
cerebro, tiroides, pulmones, corazón, hígado, nervios, dientes, piel, células y
líquidos— que se encienden con el color del elemento activo y tienen su propia
animación: el corazón late a ritmo de sístole y diástole, los pulmones se
inflan cada 4 segundos y la sangre y los nervios usan `stroke-dashoffset` para
que la señal fluya por dentro.

### Las animaciones

Las siete escenas de la leyenda
([`src/components/OriginAnimation.jsx`](src/components/OriginAnimation.jsx) y
[`src/styles/animations.css`](src/styles/animations.css)) están hechas
**únicamente con `<span>`, gradientes y `@keyframes`**. Sin canvas, sin GIF, sin
librerías:

- **Big Bang** — una singularidad que estalla y tres capas de ondas expandiéndose.
- **Rayos cósmicos** — cuatro partículas cruzan la escena, revientan un núcleo y salen esquirlas.
- **Ciclo CNO** — un sol que respira con cuatro protones girando a su alrededor, entrando de uno en uno.
- **Supernova** — la estrella se hincha, colapsa a un sexto de su tamaño y rebota en una onda de choque.
- **Tipo Ia** — una compañera cede materia por un chorro que fluye hasta que la enana blanca detona y desaparece.
- **Kilonova** — dos estrellas de neutrones en espiral (con ondas gravitacionales) que colapsan una sobre otra y expulsan metales pesados.
- **Acelerador** — dos haces girando en sentidos opuestos que chocan y crean un átomo que se desintegra.

Todas comparten un ciclo de 4 segundos y **se miden en `em`**: eso permite
reutilizar la misma escena en la leyenda (`font-size: 16px`) y, en miniatura,
dentro de la ficha del elemento (`font-size: 5.4px`) sin escribir nada dos
veces.

### El sonido

[`src/audio/AudioEngine.js`](src/audio/AudioEngine.js) es un sintetizador
completo escrito a mano con la Web Audio API. **No se carga ningún archivo de
audio**: no hay samples, ni MP3, ni librerías de sonido. Todo se calcula en el
navegador, muestra a muestra.

- **Reverberación** — respuesta al impulso generada por procedimiento (ruido con caída exponencial), no muestreada de ninguna sala real.
- **Ambiente** — un drone en re menor: sub a 36,7 Hz, dos sierras desafinadas y un filtro paso bajo que respira con un LFO a 0,045 Hz.
- **Melodía** — un motivo original de dieciséis notas sobre una escala pentatónica de re menor, tocado con campanas de tres parciales y una separación variable de 2,4 a 4 s, de modo que nunca suena igual dos veces.
- **La tabla como instrumento** — al pasar por cada casilla suena una nota cuya altura sube con el número atómico: se puede "tocar" la tabla periódica.
- **Siete efectos**, uno por evento. El de la kilonova reproduce el *chirp* real de una espiral de estrellas de neutrones: la frecuencia y el volumen suben hasta el instante de la fusión, igual que en la señal gravitacional GW170817.

El sonido **empieza apagado** y sólo se activa con un gesto explícito (el botón
«Comenzar el viaje» o el interruptor de la cabecera), como exigen los
navegadores.

### Los idiomas

El **español es el idioma principal y por omisión**. La cascada de resolución
está en [`src/i18n/LanguageContext.jsx`](src/i18n/LanguageContext.jsx):

```
?lang=en en la URL   →   preferencia guardada en localStorage   →   español
```

No se deduce del idioma del navegador: la página abre en español salvo que
alguien pida otra cosa. Al cambiar de idioma se actualizan el atributo
`<html lang>`, el `<title>`, la metadescripción y el parámetro `?lang=` de la
URL, de modo que cualquier enlace se puede compartir en el idioma en que se
estaba leyendo.

Los textos de interfaz están en
[`src/i18n/translations.js`](src/i18n/translations.js); los textos de contenido
(elementos, orígenes, línea del tiempo) viven junto a sus datos, con las claves
`es` y `en` una al lado de la otra para que sea imposible traducir una y
olvidar la otra.

---

## Estructura del proyecto

```
Human-from-Stars/
├── index.html                 Documento raíz (favicon SVG incrustado)
├── vite.config.js             Configuración de Vite (base configurable)
├── package.json
├── README.md                  Esta documentación
├── README.en.md               Documentación en inglés
└── src/
    ├── main.jsx               Punto de entrada: providers + estilos
    ├── App.jsx                Composición de la página y estado compartido
    ├── data/
    │   ├── elements.js        Los 118 elementos: nombre, posición y origen
    │   ├── bodyElements.js    Los 30 del cuerpo: dónde viven y para qué sirven
    │   └── origins.js         Los siete eventos y la línea del tiempo
    ├── components/
    │   ├── Starfield.jsx      Cielo en canvas: parallax y estrellas fugaces
    │   ├── Header.jsx         Navegación, idioma y sonido
    │   ├── PeriodicTable.jsx  Rejilla de 18 columnas con las casillas
    │   ├── BodySilhouette.jsx Cuerpo en SVG y regiones anatómicas
    │   ├── ElementDetail.jsx  Ficha del elemento seleccionado
    │   ├── OriginAnimation.jsx Las siete escenas CSS
    │   ├── Legend.jsx         Leyenda de colores y eventos
    │   └── Timeline.jsx       Línea del tiempo con aparición progresiva
    ├── audio/
    │   ├── AudioEngine.js     Sintetizador (Web Audio API)
    │   └── useAudio.js        Contexto de React para el motor de audio
    ├── i18n/
    │   ├── translations.js    Textos de interfaz (es / en)
    │   └── LanguageContext.jsx Resolución y cambio de idioma
    └── styles/
        ├── base.css           Variables, tipografía, fondo estrellado
        ├── layout.css         Cabecera, portada, secciones, leyenda, pie
        ├── table.css          Tabla periódica y ficha de detalle
        ├── body.css           Silueta y regiones anatómicas
        └── animations.css     Los siete eventos cósmicos en CSS
```

---

## Cómo añadir o corregir datos

**Cambiar el origen de un elemento** — edita su fila en
`src/data/elements.js`. El formato es
`[Z, símbolo, nombre_es, nombre_en, columna, fila, origen]`:

```js
[26, 'Fe', 'Hierro', 'Iron', 8, 4, 'white_dwarfs'],
```

**Añadir un elemento al cuerpo** — añade una entrada en
`src/data/bodyElements.js` con su porcentaje de masa, la cantidad en un adulto
de 70 kg, las regiones que ocupa y su descripción en ambos idiomas. Se
iluminará solo en la tabla y aparecerá en la leyenda de su origen.

**Añadir un evento cósmico** — añade una entrada en `ORIGINS` (con color y
textos), inclúyela en `ORIGIN_ORDER`, crea su escena en `SCENES` dentro de
`OriginAnimation.jsx`, sus `@keyframes` en `animations.css` y su método
`_sfxLoQueSea()` en `AudioEngine.js`.

---

## Accesibilidad

- Toda la navegación funciona con teclado; las casillas de la tabla son
  `<button>` reales con `aria-pressed` y descripción en el `title`.
- Enlace **«Saltar al contenido»** al principio del documento.
- La silueta tiene `role="img"` y una etiqueta traducida; la ficha de detalle
  es una región `aria-live` que anuncia el elemento seleccionado.
- Las animaciones son decorativas y están marcadas con `aria-hidden`.
- **`prefers-reduced-motion`**: si el sistema lo pide, se detienen el cielo, las
  animaciones y las apariciones progresivas, y la línea del tiempo se muestra
  entera de golpe.
- El sonido nunca se reproduce sin permiso explícito.

---

## Compatibilidad

Navegadores modernos con soporte de Web Audio API, `color-mix()` y
`backdrop-filter`: Chrome/Edge 111+, Firefox 113+, Safari 16.4+.

Si el navegador no permite crear un `AudioContext`, la página funciona igual:
simplemente se queda en silencio.

---

## Despliegue

El resultado de `npm run build` es una carpeta `dist/` completamente estática:
sirve en cualquier hosting sin configuración.

Para publicar en un subdirectorio (por ejemplo GitHub Pages):

```bash
BASE_PATH=/human-from-stars/ npm run build
```

---

## Fuentes

- Johnson, J. A. (2017). *Origin of the Elements in the Solar System*, SDSS Blog / Ohio State University.
- Composición elemental del cuerpo humano: valores de referencia para un adulto de 70 kg (Emsley, *Nature's Building Blocks*; ICRP Publication 23).
- Abbott, B. P. et al. (2017). *GW170817: Observation of Gravitational Waves from a Binary Neutron Star Inspiral*, Physical Review Letters 119, 161101.

Los porcentajes de masa corporal y las cantidades son valores aproximados de
referencia; varían con la edad, el sexo, la dieta y el individuo.

---

## Licencia

MIT. El código, las animaciones y la música son originales de este proyecto.
