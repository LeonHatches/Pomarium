/**
 * Barril de ilustraciones de especies de planta.
 * -----------------------------------------------------------------------
 * Cada especie del catálogo (ver src/data/catalogoPlantas.js) tiene su
 * propio componente SVG aquí. Para reemplazar el diseño de una planta,
 * tu compañero solo necesita editar el archivo correspondiente
 * (por ejemplo CactusEstrella.jsx) — el resto de la app no cambia,
 * porque siempre se referencia a través del mapa ICONOS_PLANTAS.
 */
import CactusEstrella from "./CactusEstrella";
import SuculentaRosa from "./SuculentaRosa";
import AloeVera from "./AloeVera";
import Albahaca from "./Albahaca";
import Rabano from "./Rabano";
import Tomatero from "./Tomatero";
import Fresa from "./Fresa";
import Limonero from "./Limonero";
import PlantaGenerica from "./PlantaGenerica";

export {
  CactusEstrella,
  SuculentaRosa,
  AloeVera,
  Albahaca,
  Rabano,
  Tomatero,
  Fresa,
  Limonero,
  PlantaGenerica,
};

// Mapa especieId -> componente ilustración. Úsalo en vez de un switch
// manual: así, añadir una especie nueva es solo agregar una línea aquí.
export const ICONOS_PLANTAS = {
  "cactus-estrella": CactusEstrella,
  "suculenta-rosa": SuculentaRosa,
  "aloe-vera": AloeVera,
  "albahaca": Albahaca,
  "rabano": Rabano,
  "tomatero": Tomatero,
  "fresa": Fresa,
  "limonero": Limonero,
};

export function obtenerIconoPlanta(especieId) {
  return ICONOS_PLANTAS[especieId] || PlantaGenerica;
}
