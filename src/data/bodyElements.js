/**
 * Los elementos químicos presentes en el cuerpo humano, dónde están y para qué sirven.
 * The chemical elements present in the human body, where they live and what they do.
 *
 * Los porcentajes son fracción de masa corporal; las cantidades corresponden
 * a un adulto de referencia de 70 kg.
 * Percentages are body mass fraction; amounts are for a 70 kg reference adult.
 */

/** Regiones anatómicas resaltables en la silueta / highlightable regions of the silhouette. */
export const REGIONS = {
  cells: { es: 'Todas las células', en: 'Every cell' },
  skeleton: { es: 'Huesos', en: 'Bones' },
  teeth: { es: 'Dientes y esmalte', en: 'Teeth and enamel' },
  blood: { es: 'Sangre', en: 'Blood' },
  muscles: { es: 'Músculos', en: 'Muscles' },
  brain: { es: 'Cerebro', en: 'Brain' },
  nerves: { es: 'Sistema nervioso', en: 'Nervous system' },
  thyroid: { es: 'Tiroides', en: 'Thyroid' },
  lungs: { es: 'Pulmones', en: 'Lungs' },
  heart: { es: 'Corazón', en: 'Heart' },
  liver: { es: 'Hígado y riñones', en: 'Liver and kidneys' },
  skin: { es: 'Piel, pelo y uñas', en: 'Skin, hair and nails' },
  fluids: { es: 'Líquidos corporales', en: 'Body fluids' }
};

const RAW = [
  {
    s: 'O',
    pct: 65,
    amount: { es: '43 kg', en: '43 kg' },
    regions: ['cells', 'lungs', 'blood', 'fluids'],
    es: {
      where: 'Agua corporal, sangre y pulmones',
      role: 'Es dos tercios de tu masa. Forma el agua que llena tus células y quema los azúcares en las mitocondrias para darte energía a cada segundo.'
    },
    en: {
      where: 'Body water, blood and lungs',
      role: 'Two thirds of your mass. It forms the water that fills your cells and burns sugars in your mitochondria to give you energy every second.'
    }
  },
  {
    s: 'C',
    pct: 18.5,
    amount: { es: '13 kg', en: '13 kg' },
    regions: ['cells', 'muscles', 'skin'],
    es: {
      where: 'Músculos, grasa, piel y ADN',
      role: 'El esqueleto de toda molécula viva. Cada proteína, cada gen y cada fibra muscular es una cadena de átomos de carbono.'
    },
    en: {
      where: 'Muscles, fat, skin and DNA',
      role: 'The scaffold of every living molecule. Every protein, every gene and every muscle fibre is a chain of carbon atoms.'
    }
  },
  {
    s: 'H',
    pct: 9.5,
    amount: { es: '6,3 kg', en: '6.3 kg' },
    regions: ['cells', 'fluids', 'blood'],
    es: {
      where: 'Agua de todo el cuerpo',
      role: 'El elemento más antiguo que existe. Sus átomos, nacidos tres minutos después del Big Bang, forman el agua que eres en un 60 %.'
    },
    en: {
      where: 'Water throughout the body',
      role: 'The oldest element there is. Its atoms, born three minutes after the Big Bang, make up the water that you are 60% made of.'
    }
  },
  {
    s: 'N',
    pct: 3.2,
    amount: { es: '2,0 kg', en: '2.0 kg' },
    regions: ['muscles', 'cells', 'brain'],
    es: {
      where: 'Proteínas, ADN y músculos',
      role: 'Sin nitrógeno no hay aminoácidos ni código genético. Es la letra que escribe tus instrucciones.'
    },
    en: {
      where: 'Proteins, DNA and muscles',
      role: 'Without nitrogen there are no amino acids and no genetic code. It is the letter that writes your instructions.'
    }
  },
  {
    s: 'Ca',
    pct: 1.5,
    amount: { es: '1,0 kg', en: '1.0 kg' },
    regions: ['skeleton', 'teeth', 'muscles', 'heart'],
    es: {
      where: 'Huesos, dientes y contracción muscular',
      role: 'El 99 % está en tu esqueleto. El 1 % restante hace que tu corazón lata y que tus músculos puedan contraerse.'
    },
    en: {
      where: 'Bones, teeth and muscle contraction',
      role: '99% sits in your skeleton. The remaining 1% makes your heart beat and lets your muscles contract.'
    }
  },
  {
    s: 'P',
    pct: 1.0,
    amount: { es: '780 g', en: '780 g' },
    regions: ['skeleton', 'teeth', 'cells'],
    es: {
      where: 'Huesos y moléculas de energía (ATP)',
      role: 'Endurece tus huesos y guarda la energía en el ATP: cada movimiento que haces gasta un enlace de fósforo.'
    },
    en: {
      where: 'Bones and energy molecules (ATP)',
      role: 'It hardens your bones and stores energy in ATP: every movement you make spends a phosphorus bond.'
    }
  },
  {
    s: 'K',
    pct: 0.4,
    amount: { es: '140 g', en: '140 g' },
    regions: ['nerves', 'muscles', 'cells', 'heart'],
    es: {
      where: 'Interior de las células y nervios',
      role: 'Junto al sodio genera el impulso eléctrico. Cada pensamiento tuyo es potasio saliendo de una neurona.'
    },
    en: {
      where: 'Inside cells and nerves',
      role: 'Together with sodium it generates the electrical impulse. Every thought you have is potassium leaving a neuron.'
    }
  },
  {
    s: 'S',
    pct: 0.3,
    amount: { es: '140 g', en: '140 g' },
    regions: ['skin', 'muscles', 'cells'],
    es: {
      where: 'Pelo, uñas y proteínas',
      role: 'Los puentes de azufre son los que dan forma a las proteínas y hacen que tu pelo sea liso o rizado.'
    },
    en: {
      where: 'Hair, nails and proteins',
      role: 'Sulfur bridges give proteins their shape and decide whether your hair is straight or curly.'
    }
  },
  {
    s: 'Na',
    pct: 0.2,
    amount: { es: '100 g', en: '100 g' },
    regions: ['blood', 'nerves', 'fluids'],
    es: {
      where: 'Sangre y líquido extracelular',
      role: 'Mantiene el equilibrio del agua y dispara los impulsos nerviosos. Tu sangre sigue teniendo la salinidad del océano primitivo.'
    },
    en: {
      where: 'Blood and extracellular fluid',
      role: 'It keeps your water balance and fires nerve impulses. Your blood still carries the salinity of the primordial ocean.'
    }
  },
  {
    s: 'Cl',
    pct: 0.2,
    amount: { es: '95 g', en: '95 g' },
    regions: ['fluids', 'blood', 'liver'],
    es: {
      where: 'Jugos gástricos y plasma',
      role: 'Forma el ácido clorhídrico del estómago que disuelve tu comida y equilibra la carga eléctrica de la sangre.'
    },
    en: {
      where: 'Gastric juice and plasma',
      role: 'It forms the hydrochloric acid in your stomach that dissolves your food and balances the electrical charge of your blood.'
    }
  },
  {
    s: 'Mg',
    pct: 0.05,
    amount: { es: '19 g', en: '19 g' },
    regions: ['skeleton', 'muscles', 'cells'],
    es: {
      where: 'Huesos y enzimas',
      role: 'Interviene en más de 300 reacciones enzimáticas y relaja los músculos después de cada contracción.'
    },
    en: {
      where: 'Bones and enzymes',
      role: 'It takes part in more than 300 enzyme reactions and relaxes muscles after every contraction.'
    }
  },
  {
    s: 'Fe',
    pct: 0.006,
    amount: { es: '4,2 g', en: '4.2 g' },
    regions: ['blood', 'muscles', 'liver'],
    es: {
      where: 'Hemoglobina de la sangre',
      role: 'Cuatro gramos escasos, pero sin ellos morirías en minutos: el hierro es lo que agarra el oxígeno y lo reparte por tu cuerpo. También es lo que hace roja a tu sangre.'
    },
    en: {
      where: 'Haemoglobin in your blood',
      role: 'Barely four grams, yet without them you would die in minutes: iron is what grabs oxygen and delivers it through your body. It is also what makes your blood red.'
    }
  },
  {
    s: 'F',
    pct: 0.0037,
    amount: { es: '2,6 g', en: '2.6 g' },
    regions: ['teeth', 'skeleton'],
    es: {
      where: 'Esmalte dental y huesos',
      role: 'Se incorpora al esmalte y lo vuelve más resistente al ácido de las bacterias.'
    },
    en: {
      where: 'Tooth enamel and bones',
      role: 'It locks into enamel and makes it far more resistant to bacterial acid.'
    }
  },
  {
    s: 'Zn',
    pct: 0.0032,
    amount: { es: '2,3 g', en: '2.3 g' },
    regions: ['cells', 'skin', 'brain'],
    es: {
      where: 'Enzimas, piel y sistema inmune',
      role: 'Más de 300 enzimas lo necesitan. Cierra heridas, defiende tu cuerpo y permite que tu ADN se copie sin errores.'
    },
    en: {
      where: 'Enzymes, skin and immune system',
      role: 'Over 300 enzymes need it. It closes wounds, defends your body and lets your DNA copy itself without mistakes.'
    }
  },
  {
    s: 'Si',
    pct: 0.0014,
    amount: { es: '1,0 g', en: '1.0 g' },
    regions: ['skeleton', 'skin'],
    es: {
      where: 'Tejido conectivo y huesos',
      role: 'Ayuda a construir el colágeno que sostiene tu piel y a mineralizar el hueso nuevo.'
    },
    en: {
      where: 'Connective tissue and bones',
      role: 'It helps build the collagen that holds your skin together and mineralises new bone.'
    }
  },
  {
    s: 'Cu',
    pct: 0.0001,
    amount: { es: '72 mg', en: '72 mg' },
    regions: ['liver', 'blood', 'brain'],
    es: {
      where: 'Hígado, sangre y cerebro',
      role: 'Trabaja con el hierro para fabricar glóbulos rojos y participa en la respiración celular.'
    },
    en: {
      where: 'Liver, blood and brain',
      role: 'It works with iron to build red blood cells and takes part in cellular respiration.'
    }
  },
  {
    s: 'I',
    pct: 0.00002,
    amount: { es: '20 mg', en: '20 mg' },
    regions: ['thyroid'],
    es: {
      where: 'Glándula tiroides',
      role: 'Veinte miligramos deciden tu metabolismo entero. Sin este átomo forjado en una kilonova, tu cuerpo no sabría a qué ritmo vivir.'
    },
    en: {
      where: 'Thyroid gland',
      role: 'Twenty milligrams govern your entire metabolism. Without this atom forged in a kilonova, your body would not know at what speed to live.'
    }
  },
  {
    s: 'Mn',
    pct: 0.00002,
    amount: { es: '12 mg', en: '12 mg' },
    regions: ['skeleton', 'liver', 'brain'],
    es: {
      where: 'Huesos, hígado y riñones',
      role: 'Activa las enzimas que forman cartílago y neutraliza radicales libres dentro de las mitocondrias.'
    },
    en: {
      where: 'Bones, liver and kidneys',
      role: 'It activates the enzymes that build cartilage and neutralises free radicals inside mitochondria.'
    }
  },
  {
    s: 'Se',
    pct: 0.00002,
    amount: { es: '15 mg', en: '15 mg' },
    regions: ['thyroid', 'cells', 'liver'],
    es: {
      where: 'Antioxidantes celulares y tiroides',
      role: 'Forma el aminoácido número 21, la selenocisteína, que defiende a tus células del daño oxidativo.'
    },
    en: {
      where: 'Cellular antioxidants and thyroid',
      role: 'It forms the 21st amino acid, selenocysteine, which shields your cells from oxidative damage.'
    }
  },
  {
    s: 'Cr',
    pct: 0.0000024,
    amount: { es: '1,7 mg', en: '1.7 mg' },
    regions: ['muscles', 'liver'],
    es: {
      where: 'Metabolismo de la glucosa',
      role: 'Potencia la acción de la insulina y ayuda a que el azúcar entre en las células.'
    },
    en: {
      where: 'Glucose metabolism',
      role: 'It boosts the action of insulin and helps sugar enter your cells.'
    }
  },
  {
    s: 'Mo',
    pct: 0.0000007,
    amount: { es: '5 mg', en: '5 mg' },
    regions: ['liver', 'cells'],
    es: {
      where: 'Hígado y enzimas',
      role: 'Cofactor de las enzimas que desintoxican los sulfitos y reciclan las purinas del ADN.'
    },
    en: {
      where: 'Liver and enzymes',
      role: 'A cofactor of the enzymes that detoxify sulfites and recycle DNA purines.'
    }
  },
  {
    s: 'Co',
    pct: 0.0000021,
    amount: { es: '1,5 mg', en: '1.5 mg' },
    regions: ['blood', 'nerves', 'liver'],
    es: {
      where: 'Núcleo de la vitamina B12',
      role: 'Un solo átomo de cobalto en el centro de la B12 mantiene sanos tus nervios y fabrica glóbulos rojos.'
    },
    en: {
      where: 'Core of vitamin B12',
      role: 'A single cobalt atom at the centre of B12 keeps your nerves healthy and builds red blood cells.'
    }
  },
  {
    s: 'B',
    pct: 0.00003,
    amount: { es: '18 mg', en: '18 mg' },
    regions: ['skeleton', 'brain'],
    es: {
      where: 'Huesos y función cognitiva',
      role: 'Ayuda a fijar el calcio en el hueso e influye en la actividad eléctrica del cerebro.'
    },
    en: {
      where: 'Bones and cognitive function',
      role: 'It helps fix calcium in bone and influences the brain electrical activity.'
    }
  },
  {
    s: 'V',
    pct: 0.0000002,
    amount: { es: '0,1 mg', en: '0.1 mg' },
    regions: ['skeleton', 'liver'],
    es: {
      where: 'Huesos y metabolismo lipídico',
      role: 'En cantidades diminutas participa en la regulación del azúcar y el colesterol.'
    },
    en: {
      where: 'Bones and lipid metabolism',
      role: 'In tiny amounts it takes part in regulating sugar and cholesterol.'
    }
  },
  {
    s: 'Ni',
    pct: 0.0000015,
    amount: { es: '1 mg', en: '1 mg' },
    regions: ['liver', 'cells'],
    es: {
      where: 'Enzimas y hormonas',
      role: 'Estabiliza el ADN y colabora en el metabolismo del hierro.'
    },
    en: {
      where: 'Enzymes and hormones',
      role: 'It stabilises DNA and assists in iron metabolism.'
    }
  },
  {
    s: 'Sn',
    pct: 0.0000003,
    amount: { es: '0,2 mg', en: '0.2 mg' },
    regions: ['skeleton', 'liver'],
    es: {
      where: 'Tejidos en cantidades traza',
      role: 'Presente en trazas; se le atribuye un papel en el crecimiento y la respuesta inmunitaria.'
    },
    en: {
      where: 'Tissues in trace amounts',
      role: 'Present in traces; linked to growth and the immune response.'
    }
  },
  {
    s: 'Br',
    pct: 0.00029,
    amount: { es: '200 mg', en: '200 mg' },
    regions: ['cells', 'fluids'],
    es: {
      where: 'Membranas basales del tejido',
      role: 'Es imprescindible para tejer el colágeno IV, el andamio sobre el que se apoyan todos tus tejidos.'
    },
    en: {
      where: 'Tissue basement membranes',
      role: 'It is essential for weaving collagen IV, the scaffold every one of your tissues rests on.'
    }
  },
  {
    s: 'Li',
    pct: 0.0000010,
    amount: { es: '0,7 mg', en: '0.7 mg' },
    regions: ['brain', 'nerves'],
    es: {
      where: 'Cerebro en cantidades traza',
      role: 'Un vestigio del Big Bang que circula por tu cerebro e influye sutilmente en el estado de ánimo.'
    },
    en: {
      where: 'Brain in trace amounts',
      role: 'A relic of the Big Bang circulating in your brain, subtly influencing mood.'
    }
  },
  {
    s: 'Sr',
    pct: 0.00046,
    amount: { es: '320 mg', en: '320 mg' },
    regions: ['skeleton', 'teeth'],
    es: {
      where: 'Huesos, junto al calcio',
      role: 'Se cuela en el cristal del hueso ocupando el sitio del calcio y aumenta su densidad.'
    },
    en: {
      where: 'Bones, alongside calcium',
      role: 'It slips into the bone crystal in place of calcium and increases its density.'
    }
  },
  {
    s: 'As',
    pct: 0.00001,
    amount: { es: '7 mg', en: '7 mg' },
    regions: ['liver', 'skin'],
    es: {
      where: 'Trazas en tejidos',
      role: 'Tóxico en dosis altas, pero en cantidades ínfimas parece intervenir en el metabolismo de aminoácidos.'
    },
    en: {
      where: 'Traces in tissues',
      role: 'Toxic in high doses, yet in minute amounts it appears to play a role in amino acid metabolism.'
    }
  }
];

export const BODY_ELEMENTS = RAW;

export const BODY_SYMBOLS = new Set(RAW.map((e) => e.s));

export const BODY_BY_SYMBOL = RAW.reduce((acc, e) => {
  acc[e.s] = e;
  return acc;
}, {});

/** Formatea el porcentaje de masa de forma legible según el idioma. */
export function formatPct(pct, lang) {
  const value = pct >= 0.01 ? pct.toFixed(pct >= 1 ? 1 : 2) : pct.toPrecision(2);
  const text = String(value);
  return `${lang === 'es' ? text.replace('.', ',') : text} %`;
}
