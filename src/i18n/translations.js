/**
 * Textos de la interfaz. El español es el idioma principal y por omisión.
 * UI copy. Spanish is the primary and default language.
 */

export const LANGUAGES = [
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'en', label: 'English', flag: 'EN' }
];

export const DEFAULT_LANG = 'es';

export const T = {
  es: {
    htmlTitle: 'Humano de Estrellas · El origen cósmico de tu cuerpo',
    htmlDescription:
      'Visualización interactiva del origen astronómico de cada elemento químico del cuerpo humano.',

    'hero.eyebrow': 'Nucleosíntesis · Astroquímica · Biología',
    'hero.title': 'Humano de Estrellas',
    'hero.subtitle': 'El origen cósmico de tu cuerpo',
    'hero.lead':
      'Ningún átomo de tu cuerpo se fabricó en la Tierra. Cada uno fue forjado en el Big Bang, en el corazón de una estrella o en la colisión de dos cadáveres estelares. Hicieron falta 13 800 millones de años de catástrofes cósmicas para que hoy puedas leer esta frase.',
    'hero.enter': 'Comenzar el viaje',
    'hero.scroll': 'Desplázate para explorar',
    'hero.sound': 'Con sonido original · usa auriculares',

    'nav.body': 'El cuerpo',
    'nav.legend': 'Los eventos',
    'nav.timeline': 'La línea del tiempo',

    'sound.on': 'Silenciar sonido',
    'sound.off': 'Activar sonido',
    'sound.label': 'Sonido',

    'body.title': 'De qué estás hecho',
    'body.lead':
      'Pasa el cursor por la tabla periódica o por el cuerpo. Los elementos iluminados son los que te forman; su color indica el evento astronómico que los fabricó.',
    'body.silhouetteAlt': 'Silueta humana con los órganos y tejidos resaltados',
    'body.hint': 'Toca un elemento para escuchar y ver su origen',
    'body.stats.elements': 'Elementos en tu cuerpo',
    'body.stats.events': 'Eventos cósmicos necesarios',
    'body.stats.age': 'Edad de tus átomos de hidrógeno',
    'body.stats.ageValue': '13 800 millones de años',
    'body.regionLabel': 'Dónde está',

    'table.title': 'Tabla periódica del origen cósmico',
    'table.filterAll': 'Todos los elementos',
    'table.filterBody': 'Solo los del cuerpo',
    'table.lanthanides': 'Lantánidos',
    'table.actinides': 'Actínidos',
    'table.legendBody': 'Presente en el cuerpo humano',
    'table.legendOther': 'No presente de forma significativa',

    'detail.empty': 'Selecciona un elemento para descubrir su historia.',
    'detail.origin': 'Forjado en',
    'detail.inBody': 'En tu cuerpo',
    'detail.abundance': 'Masa corporal',
    'detail.amount': 'Cantidad en 70 kg',
    'detail.notInBody': 'Este elemento no forma parte de la química del cuerpo humano.',
    'detail.when': 'Cuándo ocurrió',
    'detail.duration': 'Duración del evento',
    'detail.close': 'Cerrar',
    'detail.play': 'Escuchar el evento',

    'legend.title': 'Los siete orígenes',
    'legend.lead':
      'Cada color de la tabla corresponde a un tipo de catástrofe cósmica. Estas son las siete forjas que fabricaron todos los átomos que existen.',
    'legend.elementsInBody': 'elementos en tu cuerpo',
    'legend.elementInBody': 'elemento en tu cuerpo',
    'legend.noneInBody': 'ninguno en tu cuerpo',
    'legend.hear': 'Escuchar',

    'timeline.title': 'Trece mil ochocientos millones de años para existir',
    'timeline.lead':
      'La lista de cosas que tuvieron que salir bien. Cada una de ellas ocurrió antes de que tú pudieras respirar por primera vez.',
    'timeline.now': 'Hoy · estás aquí',

    'closing.quote':
      'Somos polvo de estrellas que ha tomado conciencia de sí mismo. Cada átomo de tu cuerpo estuvo dentro de una estrella que explotó.',
    'closing.author': '— La historia que cuentan tus propios átomos',
    'closing.credit': 'Hecho con datos de nucleosíntesis, sonido sintetizado en tiempo real y admiración.',

    'footer.data': 'Origen de los elementos según Jennifer A. Johnson (2017)',
    'footer.source': 'Código fuente',
    'footer.audioNote': 'Todo el audio se genera en tu navegador con la Web Audio API. Ningún archivo externo.',

    'a11y.skip': 'Saltar al contenido',
    'a11y.langSwitch': 'Cambiar idioma',
    'a11y.selected': 'seleccionado'
  },

  en: {
    htmlTitle: 'Human from Stars · The cosmic origin of your body',
    htmlDescription:
      'Interactive visualization of the astronomical origin of every chemical element in the human body.',

    'hero.eyebrow': 'Nucleosynthesis · Astrochemistry · Biology',
    'hero.title': 'Human from Stars',
    'hero.subtitle': 'The cosmic origin of your body',
    'hero.lead':
      'Not a single atom in your body was made on Earth. Each one was forged in the Big Bang, in the heart of a star, or in the collision of two stellar corpses. It took 13.8 billion years of cosmic catastrophe for you to be able to read this sentence.',
    'hero.enter': 'Begin the journey',
    'hero.scroll': 'Scroll to explore',
    'hero.sound': 'With original sound · headphones recommended',

    'nav.body': 'The body',
    'nav.legend': 'The events',
    'nav.timeline': 'The timeline',

    'sound.on': 'Mute sound',
    'sound.off': 'Enable sound',
    'sound.label': 'Sound',

    'body.title': 'What you are made of',
    'body.lead':
      'Hover the periodic table or the body. The lit elements are the ones that build you; their colour tells you which astronomical event forged them.',
    'body.silhouetteAlt': 'Human silhouette with organs and tissues highlighted',
    'body.hint': 'Tap an element to see and hear its origin',
    'body.stats.elements': 'Elements in your body',
    'body.stats.events': 'Cosmic events required',
    'body.stats.age': 'Age of your hydrogen atoms',
    'body.stats.ageValue': '13.8 billion years',
    'body.regionLabel': 'Where it lives',

    'table.title': 'Periodic table of cosmic origin',
    'table.filterAll': 'All elements',
    'table.filterBody': 'Body elements only',
    'table.lanthanides': 'Lanthanides',
    'table.actinides': 'Actinides',
    'table.legendBody': 'Present in the human body',
    'table.legendOther': 'Not significantly present',

    'detail.empty': 'Pick an element to uncover its story.',
    'detail.origin': 'Forged in',
    'detail.inBody': 'In your body',
    'detail.abundance': 'Body mass',
    'detail.amount': 'Amount in 70 kg',
    'detail.notInBody': 'This element is not part of human body chemistry.',
    'detail.when': 'When it happened',
    'detail.duration': 'Event duration',
    'detail.close': 'Close',
    'detail.play': 'Hear the event',

    'legend.title': 'The seven origins',
    'legend.lead':
      'Every colour in the table matches a kind of cosmic catastrophe. These are the seven forges that made every atom in existence.',
    'legend.elementsInBody': 'elements in your body',
    'legend.elementInBody': 'element in your body',
    'legend.noneInBody': 'none in your body',
    'legend.hear': 'Listen',

    'timeline.title': 'Thirteen point eight billion years to exist',
    'timeline.lead':
      'The list of things that had to go right. Every one of them happened before you could take your first breath.',
    'timeline.now': 'Today · you are here',

    'closing.quote':
      'We are star dust that became aware of itself. Every atom in your body was once inside a star that exploded.',
    'closing.author': '— The story your own atoms tell',
    'closing.credit': 'Made with nucleosynthesis data, real-time synthesized sound and awe.',

    'footer.data': 'Element origins after Jennifer A. Johnson (2017)',
    'footer.source': 'Source code',
    'footer.audioNote': 'All audio is generated in your browser with the Web Audio API. No external files.',

    'a11y.skip': 'Skip to content',
    'a11y.langSwitch': 'Switch language',
    'a11y.selected': 'selected'
  }
};
