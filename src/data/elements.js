/**
 * Tabla periódica completa (118 elementos) con su origen astrofísico dominante.
 * Complete periodic table (118 elements) with its dominant astrophysical origin.
 *
 * z  = número atómico / atomic number
 * s  = símbolo / symbol
 * es = nombre en español / Spanish name
 * en = nombre en inglés / English name
 * x  = columna en la rejilla (1-18) / grid column
 * y  = fila en la rejilla (1-7, 9-10 para bloque f) / grid row (9-10 = f-block)
 * o  = clave del evento de origen / origin event key
 */

const RAW = [
  [1, 'H', 'Hidrógeno', 'Hydrogen', 1, 1, 'big_bang'],
  [2, 'He', 'Helio', 'Helium', 18, 1, 'big_bang'],

  [3, 'Li', 'Litio', 'Lithium', 1, 2, 'big_bang'],
  [4, 'Be', 'Berilio', 'Beryllium', 2, 2, 'cosmic_rays'],
  [5, 'B', 'Boro', 'Boron', 13, 2, 'cosmic_rays'],
  [6, 'C', 'Carbono', 'Carbon', 14, 2, 'low_mass_stars'],
  [7, 'N', 'Nitrógeno', 'Nitrogen', 15, 2, 'low_mass_stars'],
  [8, 'O', 'Oxígeno', 'Oxygen', 16, 2, 'massive_stars'],
  [9, 'F', 'Flúor', 'Fluorine', 17, 2, 'massive_stars'],
  [10, 'Ne', 'Neón', 'Neon', 18, 2, 'massive_stars'],

  [11, 'Na', 'Sodio', 'Sodium', 1, 3, 'massive_stars'],
  [12, 'Mg', 'Magnesio', 'Magnesium', 2, 3, 'massive_stars'],
  [13, 'Al', 'Aluminio', 'Aluminium', 13, 3, 'massive_stars'],
  [14, 'Si', 'Silicio', 'Silicon', 14, 3, 'massive_stars'],
  [15, 'P', 'Fósforo', 'Phosphorus', 15, 3, 'massive_stars'],
  [16, 'S', 'Azufre', 'Sulfur', 16, 3, 'massive_stars'],
  [17, 'Cl', 'Cloro', 'Chlorine', 17, 3, 'massive_stars'],
  [18, 'Ar', 'Argón', 'Argon', 18, 3, 'massive_stars'],

  [19, 'K', 'Potasio', 'Potassium', 1, 4, 'massive_stars'],
  [20, 'Ca', 'Calcio', 'Calcium', 2, 4, 'massive_stars'],
  [21, 'Sc', 'Escandio', 'Scandium', 3, 4, 'massive_stars'],
  [22, 'Ti', 'Titanio', 'Titanium', 4, 4, 'massive_stars'],
  [23, 'V', 'Vanadio', 'Vanadium', 5, 4, 'massive_stars'],
  [24, 'Cr', 'Cromo', 'Chromium', 6, 4, 'white_dwarfs'],
  [25, 'Mn', 'Manganeso', 'Manganese', 7, 4, 'white_dwarfs'],
  [26, 'Fe', 'Hierro', 'Iron', 8, 4, 'white_dwarfs'],
  [27, 'Co', 'Cobalto', 'Cobalt', 9, 4, 'massive_stars'],
  [28, 'Ni', 'Níquel', 'Nickel', 10, 4, 'white_dwarfs'],
  [29, 'Cu', 'Cobre', 'Copper', 11, 4, 'massive_stars'],
  [30, 'Zn', 'Cinc', 'Zinc', 12, 4, 'massive_stars'],
  [31, 'Ga', 'Galio', 'Gallium', 13, 4, 'low_mass_stars'],
  [32, 'Ge', 'Germanio', 'Germanium', 14, 4, 'low_mass_stars'],
  [33, 'As', 'Arsénico', 'Arsenic', 15, 4, 'low_mass_stars'],
  [34, 'Se', 'Selenio', 'Selenium', 16, 4, 'neutron_star_merger'],
  [35, 'Br', 'Bromo', 'Bromine', 17, 4, 'neutron_star_merger'],
  [36, 'Kr', 'Kriptón', 'Krypton', 18, 4, 'low_mass_stars'],

  [37, 'Rb', 'Rubidio', 'Rubidium', 1, 5, 'low_mass_stars'],
  [38, 'Sr', 'Estroncio', 'Strontium', 2, 5, 'low_mass_stars'],
  [39, 'Y', 'Itrio', 'Yttrium', 3, 5, 'low_mass_stars'],
  [40, 'Zr', 'Circonio', 'Zirconium', 4, 5, 'low_mass_stars'],
  [41, 'Nb', 'Niobio', 'Niobium', 5, 5, 'low_mass_stars'],
  [42, 'Mo', 'Molibdeno', 'Molybdenum', 6, 5, 'low_mass_stars'],
  [43, 'Tc', 'Tecnecio', 'Technetium', 7, 5, 'human_made'],
  [44, 'Ru', 'Rutenio', 'Ruthenium', 8, 5, 'neutron_star_merger'],
  [45, 'Rh', 'Rodio', 'Rhodium', 9, 5, 'neutron_star_merger'],
  [46, 'Pd', 'Paladio', 'Palladium', 10, 5, 'neutron_star_merger'],
  [47, 'Ag', 'Plata', 'Silver', 11, 5, 'neutron_star_merger'],
  [48, 'Cd', 'Cadmio', 'Cadmium', 12, 5, 'low_mass_stars'],
  [49, 'In', 'Indio', 'Indium', 13, 5, 'low_mass_stars'],
  [50, 'Sn', 'Estaño', 'Tin', 14, 5, 'low_mass_stars'],
  [51, 'Sb', 'Antimonio', 'Antimony', 15, 5, 'neutron_star_merger'],
  [52, 'Te', 'Telurio', 'Tellurium', 16, 5, 'neutron_star_merger'],
  [53, 'I', 'Yodo', 'Iodine', 17, 5, 'neutron_star_merger'],
  [54, 'Xe', 'Xenón', 'Xenon', 18, 5, 'low_mass_stars'],

  [55, 'Cs', 'Cesio', 'Caesium', 1, 6, 'low_mass_stars'],
  [56, 'Ba', 'Bario', 'Barium', 2, 6, 'low_mass_stars'],
  [57, 'La', 'Lantano', 'Lanthanum', 3, 9, 'low_mass_stars'],
  [58, 'Ce', 'Cerio', 'Cerium', 4, 9, 'low_mass_stars'],
  [59, 'Pr', 'Praseodimio', 'Praseodymium', 5, 9, 'low_mass_stars'],
  [60, 'Nd', 'Neodimio', 'Neodymium', 6, 9, 'low_mass_stars'],
  [61, 'Pm', 'Prometio', 'Promethium', 7, 9, 'human_made'],
  [62, 'Sm', 'Samario', 'Samarium', 8, 9, 'low_mass_stars'],
  [63, 'Eu', 'Europio', 'Europium', 9, 9, 'neutron_star_merger'],
  [64, 'Gd', 'Gadolinio', 'Gadolinium', 10, 9, 'neutron_star_merger'],
  [65, 'Tb', 'Terbio', 'Terbium', 11, 9, 'neutron_star_merger'],
  [66, 'Dy', 'Disprosio', 'Dysprosium', 12, 9, 'neutron_star_merger'],
  [67, 'Ho', 'Holmio', 'Holmium', 13, 9, 'neutron_star_merger'],
  [68, 'Er', 'Erbio', 'Erbium', 14, 9, 'neutron_star_merger'],
  [69, 'Tm', 'Tulio', 'Thulium', 15, 9, 'neutron_star_merger'],
  [70, 'Yb', 'Iterbio', 'Ytterbium', 16, 9, 'low_mass_stars'],
  [71, 'Lu', 'Lutecio', 'Lutetium', 17, 9, 'neutron_star_merger'],
  [72, 'Hf', 'Hafnio', 'Hafnium', 4, 6, 'low_mass_stars'],
  [73, 'Ta', 'Tantalio', 'Tantalum', 5, 6, 'neutron_star_merger'],
  [74, 'W', 'Wolframio', 'Tungsten', 6, 6, 'neutron_star_merger'],
  [75, 'Re', 'Renio', 'Rhenium', 7, 6, 'neutron_star_merger'],
  [76, 'Os', 'Osmio', 'Osmium', 8, 6, 'neutron_star_merger'],
  [77, 'Ir', 'Iridio', 'Iridium', 9, 6, 'neutron_star_merger'],
  [78, 'Pt', 'Platino', 'Platinum', 10, 6, 'neutron_star_merger'],
  [79, 'Au', 'Oro', 'Gold', 11, 6, 'neutron_star_merger'],
  [80, 'Hg', 'Mercurio', 'Mercury', 12, 6, 'low_mass_stars'],
  [81, 'Tl', 'Talio', 'Thallium', 13, 6, 'low_mass_stars'],
  [82, 'Pb', 'Plomo', 'Lead', 14, 6, 'low_mass_stars'],
  [83, 'Bi', 'Bismuto', 'Bismuth', 15, 6, 'neutron_star_merger'],
  [84, 'Po', 'Polonio', 'Polonium', 16, 6, 'neutron_star_merger'],
  [85, 'At', 'Astato', 'Astatine', 17, 6, 'neutron_star_merger'],
  [86, 'Rn', 'Radón', 'Radon', 18, 6, 'neutron_star_merger'],

  [87, 'Fr', 'Francio', 'Francium', 1, 7, 'neutron_star_merger'],
  [88, 'Ra', 'Radio', 'Radium', 2, 7, 'neutron_star_merger'],
  [89, 'Ac', 'Actinio', 'Actinium', 3, 10, 'neutron_star_merger'],
  [90, 'Th', 'Torio', 'Thorium', 4, 10, 'neutron_star_merger'],
  [91, 'Pa', 'Protactinio', 'Protactinium', 5, 10, 'neutron_star_merger'],
  [92, 'U', 'Uranio', 'Uranium', 6, 10, 'neutron_star_merger'],
  [93, 'Np', 'Neptunio', 'Neptunium', 7, 10, 'human_made'],
  [94, 'Pu', 'Plutonio', 'Plutonium', 8, 10, 'human_made'],
  [95, 'Am', 'Americio', 'Americium', 9, 10, 'human_made'],
  [96, 'Cm', 'Curio', 'Curium', 10, 10, 'human_made'],
  [97, 'Bk', 'Berkelio', 'Berkelium', 11, 10, 'human_made'],
  [98, 'Cf', 'Californio', 'Californium', 12, 10, 'human_made'],
  [99, 'Es', 'Einstenio', 'Einsteinium', 13, 10, 'human_made'],
  [100, 'Fm', 'Fermio', 'Fermium', 14, 10, 'human_made'],
  [101, 'Md', 'Mendelevio', 'Mendelevium', 15, 10, 'human_made'],
  [102, 'No', 'Nobelio', 'Nobelium', 16, 10, 'human_made'],
  [103, 'Lr', 'Lawrencio', 'Lawrencium', 17, 10, 'human_made'],
  [104, 'Rf', 'Rutherfordio', 'Rutherfordium', 4, 7, 'human_made'],
  [105, 'Db', 'Dubnio', 'Dubnium', 5, 7, 'human_made'],
  [106, 'Sg', 'Seaborgio', 'Seaborgium', 6, 7, 'human_made'],
  [107, 'Bh', 'Bohrio', 'Bohrium', 7, 7, 'human_made'],
  [108, 'Hs', 'Hasio', 'Hassium', 8, 7, 'human_made'],
  [109, 'Mt', 'Meitnerio', 'Meitnerium', 9, 7, 'human_made'],
  [110, 'Ds', 'Darmstadtio', 'Darmstadtium', 10, 7, 'human_made'],
  [111, 'Rg', 'Roentgenio', 'Roentgenium', 11, 7, 'human_made'],
  [112, 'Cn', 'Copernicio', 'Copernicium', 12, 7, 'human_made'],
  [113, 'Nh', 'Nihonio', 'Nihonium', 13, 7, 'human_made'],
  [114, 'Fl', 'Flerovio', 'Flerovium', 14, 7, 'human_made'],
  [115, 'Mc', 'Moscovio', 'Moscovium', 15, 7, 'human_made'],
  [116, 'Lv', 'Livermorio', 'Livermorium', 16, 7, 'human_made'],
  [117, 'Ts', 'Teneso', 'Tennessine', 17, 7, 'human_made'],
  [118, 'Og', 'Oganesón', 'Oganesson', 18, 7, 'human_made']
];

export const ELEMENTS = RAW.map(([z, s, es, en, x, y, o]) => ({ z, s, es, en, x, y, o }));

export const ELEMENT_BY_SYMBOL = ELEMENTS.reduce((acc, el) => {
  acc[el.s] = el;
  return acc;
}, {});

/** Marcadores de posición para el bloque f dentro de la tabla principal. */
export const FBLOCK_PLACEHOLDERS = [
  { id: 'lanthanides', x: 3, y: 6, label: '57–71' },
  { id: 'actinides', x: 3, y: 7, label: '89–103' }
];
