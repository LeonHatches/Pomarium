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
