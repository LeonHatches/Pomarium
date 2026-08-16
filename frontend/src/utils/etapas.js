import { ETAPAS } from "../data/catalogoPlantas";

/**
 * etapas.js
 * -----------------------------------------------------------------------
 * Traduce "cuánto tiempo tiene la planta" (lo que el usuario indica al
 * registrarla) en la etapa de ciclo de vida donde debe arrancar,
 * en vez de arrancar siempre por defecto en "Brote" (requerimiento 5).
 */

const MS_POR_DIA = 1000 * 60 * 60 * 24;

/**
 * Convierte una cantidad + unidad ("semanas" | "meses") en días.
 */
export function convertirADias(cantidad, unidad) {
  const n = Number(cantidad) || 0;
  if (unidad === "meses") return Math.round(n * 30.4);
  if (unidad === "semanas") return Math.round(n * 7);
  return Math.round(n);
}

/**
 * Calcula los días transcurridos desde una fecha de inicio (string ISO)
 * hasta hoy.
 */
export function diasDesdeFecha(fechaISO) {
  if (!fechaISO) return 0;
  const inicio = new Date(fechaISO);
  const hoy = new Date();
  const diff = Math.floor((hoy.getTime() - inicio.getTime()) / MS_POR_DIA);
  return Math.max(0, diff);
}

/**
 * Dado un número de días de vida y los umbrales por etapa de una especie,
 * devuelve el nombre de la etapa correspondiente (recorre ETAPAS de atrás
 * hacia adelante y se queda con la última cuyo umbral ya se cumplió).
 */
export function calcularEtapaPorDias(diasDeVida, umbralesDias) {
  let etapaResultante = ETAPAS[0];
  for (const etapa of ETAPAS) {
    const umbral = umbralesDias?.[etapa] ?? 0;
    if (diasDeVida >= umbral) {
      etapaResultante = etapa;
    }
  }
  return etapaResultante;
}

/**
 * Punto de entrada usado por el formulario de registro (SelectorPlanta):
 * dado el modo de tiempo elegido por el usuario, calcula tanto la fecha
 * de inicio real de la planta como la etapa en la que debe arrancar.
 *
 * @param {"cantidad" | "fecha"} modoTiempo
 * @param {{ cantidad?: number, unidad?: "semanas"|"meses", fecha?: string }} datosTiempo
 * @param {object} umbralesDias - umbrales de la especie elegida
 */
export function resolverInicioPlanta(modoTiempo, datosTiempo, umbralesDias) {
  let diasDeVida = 0;
  let fechaInicio;

  if (modoTiempo === "fecha" && datosTiempo.fecha) {
    fechaInicio = new Date(datosTiempo.fecha).toISOString();
    diasDeVida = diasDesdeFecha(fechaInicio);
  } else {
    diasDeVida = convertirADias(datosTiempo.cantidad, datosTiempo.unidad);
    const hoy = new Date();
    hoy.setDate(hoy.getDate() - diasDeVida);
    fechaInicio = hoy.toISOString();
  }

  const etapaInicial = calcularEtapaPorDias(diasDeVida, umbralesDias);

  return { fechaInicio, diasDeVida, etapaInicial };
}

/** Índice (0-3) de una etapa dentro del recorrido ETAPAS. */
export function indiceEtapa(nombreEtapa) {
  const i = ETAPAS.indexOf(nombreEtapa);
  return i === -1 ? 0 : i;
}
