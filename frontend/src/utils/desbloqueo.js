import { CATEGORIAS_PLANTAS, idsPlantasDecorativas, ETAPAS } from "../data/catalogoPlantas";

/**
 * desbloqueo.js
 * -----------------------------------------------------------------------
 * Reglas de nivel/desbloqueo de categorías (requerimiento 4).
 *
 * Regla: "Plantas Decorativas" es el nivel inicial obligatorio. Las demás
 * categorías permanecen bloqueadas hasta que el usuario complete (llegue
 * a "Madurez", la última etapa) al menos una planta registrada de CADA
 * una de las especies decorativas del catálogo.
 */

const ETAPA_FINAL = ETAPAS[ETAPAS.length - 1]; // "Madurez"

/**
 * @param {Array} plantasUsuario - plantas guardadas del usuario (Firestore)
 * @returns {Set<string>} IDs de especies decorativas ya completadas
 */
export function especiesDecorativasCompletadas(plantasUsuario = []) {
  const completadas = new Set();
  for (const planta of plantasUsuario) {
    if (planta.etapaActual === ETAPA_FINAL) {
      completadas.add(planta.especieId);
    }
  }
  return completadas;
}

/**
 * ¿Ya se desbloquearon las categorías avanzadas? Verdadero cuando todas
 * las especies de "Plantas Decorativas" tienen al menos una planta en
 * Madurez.
 */
export function categoriasAvanzadasDesbloqueadas(plantasUsuario = []) {
  const requeridas = idsPlantasDecorativas();
  const completadas = especiesDecorativasCompletadas(plantasUsuario);
  return requeridas.every((id) => completadas.has(id));
}

/**
 * Devuelve el catálogo de categorías anotado con `bloqueada: boolean` y
 * `progreso: { hechas, total }`, listo para pintar en la UI (candados,
 * barra de progreso, etc.)
 */
export function catalogoConEstadoDesbloqueo(plantasUsuario = []) {
  const avanzadasDesbloqueadas = categoriasAvanzadasDesbloqueadas(plantasUsuario);
  const completadas = especiesDecorativasCompletadas(plantasUsuario);
  const requeridas = idsPlantasDecorativas();

  return CATEGORIAS_PLANTAS.map((cat) => {
    if (cat.desbloqueoInicial) {
      return {
        ...cat,
        bloqueada: false,
        progreso: { hechas: completadas.size, total: requeridas.length },
      };
    }
    return {
      ...cat,
      bloqueada: !avanzadasDesbloqueadas,
      progreso: { hechas: completadas.size, total: requeridas.length },
    };
  });
}
