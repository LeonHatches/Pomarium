/**
 * catalogoPlantas.js
 * -----------------------------------------------------------------------
 * Fuente única de verdad para categorías y especies de Pomarium.
 *
 * - "Plantas Decorativas" es el nivel inicial: SIEMPRE desbloqueado.
 * - El resto de categorías empiezan bloqueadas (`desbloqueoInicial: false`)
 *   y se desbloquean cuando el usuario completa (llega a "Madurez") todas
 *   las especies de Plantas Decorativas. La lógica vive en
 *   src/utils/desbloqueo.js para no mezclar datos con reglas de negocio.
 *
 * - `umbralesDias` define, para cada especie, a partir de cuántos días de
 *   vida se considera que la planta entra en cada etapa. Se usa en
 *   src/utils/etapas.js para calcular en qué etapa debe arrancar una
 *   planta según el tiempo de vida que el usuario indique al registrarla
 *   (punto 5 de los requerimientos).
 */

export const ETAPAS = ["Brote", "Etapa Vegetativa", "Floración", "Madurez"];

export const CATEGORIAS_PLANTAS = [
  {
    id: "decorativas",
    categoria: "Plantas Decorativas",
    duracion: "Semanas a meses",
    desbloqueoInicial: true,
    plantas: [
      {
        id: "cactus-estrella",
        nombre: "Cactus Estrella (Astrophytum)",
        esDemo: true,
        // días de vida a partir de los cuales inicia cada etapa
        umbralesDias: { Brote: 0, "Etapa Vegetativa": 21, Floración: 60, Madurez: 120 },
      },
      {
        id: "suculenta-rosa",
        nombre: "Suculenta Rosa",
        esDemo: false,
        umbralesDias: { Brote: 0, "Etapa Vegetativa": 14, Floración: 45, Madurez: 90 },
      },
      {
        id: "aloe-vera",
        nombre: "Aloe Vera",
        esDemo: false,
        umbralesDias: { Brote: 0, "Etapa Vegetativa": 18, Floración: 50, Madurez: 100 },
      },
    ],
  },
  {
    id: "cultivos-rapidos",
    categoria: "Cultivos Rápidos",
    duracion: "Semanas",
    desbloqueoInicial: false,
    plantas: [
      {
        id: "albahaca",
        nombre: "Albahaca",
        esDemo: false,
        umbralesDias: { Brote: 0, "Etapa Vegetativa": 7, Floración: 21, Madurez: 40 },
      },
      {
        id: "rabano",
        nombre: "Rábano",
        esDemo: false,
        umbralesDias: { Brote: 0, "Etapa Vegetativa": 6, Floración: 18, Madurez: 30 },
      },
    ],
  },
  {
    id: "frutos-temporada",
    categoria: "Frutos de Temporada",
    duracion: "Meses",
    desbloqueoInicial: false,
    plantas: [
      {
        id: "tomatero",
        nombre: "Tomatero",
        esDemo: false,
        umbralesDias: { Brote: 0, "Etapa Vegetativa": 20, Floración: 50, Madurez: 90 },
      },
      {
        id: "fresa",
        nombre: "Fresa",
        esDemo: false,
        umbralesDias: { Brote: 0, "Etapa Vegetativa": 15, Floración: 40, Madurez: 75 },
      },
    ],
  },
  {
    id: "arboles-largo-plazo",
    categoria: "Árboles a Largo Plazo",
    duracion: "Años",
    desbloqueoInicial: false,
    plantas: [
      {
        id: "limonero",
        nombre: "Limonero",
        esDemo: false,
        umbralesDias: { Brote: 0, "Etapa Vegetativa": 180, Floración: 540, Madurez: 1095 },
      },
    ],
  },
];

/** Devuelve la especie completa (con su categoría) a partir del especieId. */
export function buscarEspecie(especieId) {
  for (const cat of CATEGORIAS_PLANTAS) {
    const planta = cat.plantas.find((p) => p.id === especieId);
    if (planta) return { ...planta, categoria: cat.categoria, categoriaId: cat.id };
  }
  return null;
}

/** IDs de todas las especies de la categoría inicial (Plantas Decorativas). */
export function idsPlantasDecorativas() {
  const cat = CATEGORIAS_PLANTAS.find((c) => c.desbloqueoInicial);
  return cat ? cat.plantas.map((p) => p.id) : [];
}

/**
 * Cuidados numéricos por especie y etapa — alimentan los anillos circulares
 * del Dashboard rediseñado. Cada valor es { valor, unidad, tipo }.
 */
export const CUIDADOS_POR_ETAPA = {
  "cactus-estrella": {
    Brote: {
      agua: { valor: 7, unidad: "días", tipo: "riego ligero" },
      luz:  { valor: 4, unidad: "h", tipo: "indirecta" },
      nutrientes: { valor: 0, unidad: "días", tipo: "ninguno aún" },
    },
    "Etapa Vegetativa": {
      agua: { valor: 12, unidad: "días", tipo: "riego profundo" },
      luz:  { valor: 6, unidad: "h", tipo: "sol directo" },
      nutrientes: { valor: 30, unidad: "días", tipo: "bajo en nitrógeno" },
    },
    Floración: {
      agua: { valor: 10, unidad: "días", tipo: "riego moderado" },
      luz:  { valor: 6, unidad: "h", tipo: "directa parcial" },
      nutrientes: { valor: 15, unidad: "días", tipo: "fósforo alto" },
    },
    Madurez: {
      agua: { valor: 14, unidad: "días", tipo: "riego espaciado" },
      luz:  { valor: 8, unidad: "h", tipo: "sol directo" },
      nutrientes: { valor: 30, unidad: "días", tipo: "mantenimiento" },
    },
  },
  _default: {
    Brote: {
      agua: { valor: 3, unidad: "días", tipo: "riego ligero" },
      luz:  { valor: 4, unidad: "h", tipo: "indirecta" },
      nutrientes: { valor: 0, unidad: "días", tipo: "ninguno aún" },
    },
    "Etapa Vegetativa": {
      agua: { valor: 5, unidad: "días", tipo: "riego moderado" },
      luz:  { valor: 6, unidad: "h", tipo: "indirecta" },
      nutrientes: { valor: 15, unidad: "días", tipo: "abono suave" },
    },
    Floración: {
      agua: { valor: 4, unidad: "días", tipo: "riego regular" },
      luz:  { valor: 6, unidad: "h", tipo: "directa parcial" },
      nutrientes: { valor: 10, unidad: "días", tipo: "rico en fósforo" },
    },
    Madurez: {
      agua: { valor: 7, unidad: "días", tipo: "semanal" },
      luz:  { valor: 7, unidad: "h", tipo: "directa" },
      nutrientes: { valor: 30, unidad: "días", tipo: "mantenimiento" },
    },
  },
};

/** Devuelve los cuidados numéricos para una especie y etapa dadas. */
export function obtenerCuidados(especieId, etapa) {
  const porEspecie = CUIDADOS_POR_ETAPA[especieId] || CUIDADOS_POR_ETAPA._default;
  return porEspecie[etapa] || porEspecie["Brote"];
}

/**
 * Metadatos extra por especie para la vista de perfil: familia botánica,
 * nombre científico y nivel de dificultad.
 */
export const METADATA_PLANTAS = {
  "cactus-estrella": {
    familia: "Cactaceae",
    cientifico: "Astrophytum",
    dificultad: "Fácil",
  },
  "suculenta-rosa": {
    familia: "Crassulaceae",
    cientifico: "Echeveria",
    dificultad: "Fácil",
  },
  "aloe-vera": {
    familia: "Asphodelaceae",
    cientifico: "Aloe barbadensis",
    dificultad: "Fácil",
  },
  "albahaca": {
    familia: "Lamiaceae",
    cientifico: "Ocimum basilicum",
    dificultad: "Media",
  },
  "rabano": {
    familia: "Brassicaceae",
    cientifico: "Raphanus sativus",
    dificultad: "Fácil",
  },
  "tomatero": {
    familia: "Solanaceae",
    cientifico: "Solanum lycopersicum",
    dificultad: "Media",
  },
  "fresa": {
    familia: "Rosaceae",
    cientifico: "Fragaria × ananassa",
    dificultad: "Media",
  },
  "limonero": {
    familia: "Rutaceae",
    cientifico: "Citrus × limon",
    dificultad: "Difícil",
  },
};

/** Devuelve los metadatos de una especie o un fallback genérico. */
export function obtenerMetadata(especieId) {
  return METADATA_PLANTAS[especieId] || { familia: "Planta", cientifico: "", dificultad: "Media" };
}
