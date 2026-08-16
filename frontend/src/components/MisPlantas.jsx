import React from "react";
import { Link } from "react-router-dom";
import { obtenerIconoPlanta } from "../assets/plants";
import { indiceEtapa } from "../utils/etapas";
import { ETAPAS } from "../data/catalogoPlantas";
import { IconAgregarPlanta } from "../assets/icons";

/**
 * MisPlantas.jsx
 * -----------------------------------------------------------------------
 * Vista "Mis Plantas" enlazada desde la navbar (requerimiento 3): lista
 * todas las plantas que el usuario tiene registradas, cargadas desde
 * Firebase (requerimiento 6), con su progreso de etapa.
 */
export default function MisPlantas({ plantas }) {
  if (!plantas) {
    return <p className="text-center text-ink/60 mt-10">Cargando tus plantas...</p>;
  }

  if (plantas.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 mt-10 text-center">
        <p className="text-ink/70">Todavía no tienes plantas registradas.</p>
        <Link
          to="/agregar"
          className="sketchy-border bg-leaf text-cream font-hand text-lg px-5 py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform flex items-center gap-2"
        >
          <IconAgregarPlanta className="w-5 h-5" /> Añadir mi primera planta
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-hand text-3xl text-leaf-dark">Mis Plantas 🌿</h1>
        <Link
          to="/agregar"
          className="sketchy-border bg-leaf text-cream font-hand text-lg px-4 py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform flex items-center gap-2"
        >
          <IconAgregarPlanta className="w-5 h-5" /> Añadir planta
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plantas.map((planta) => {
          const Icono = obtenerIconoPlanta(planta.especieId);
          const progreso = indiceEtapa(planta.etapaActual) + 1;
          return (
            <Link
              key={planta.id}
              to={`/planta/${planta.id}`}
              className="sketchy-border bg-cream-dark p-4 flex flex-col gap-3 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-leaf-light/40 flex items-center justify-center shrink-0">
                  <Icono className="w-9 h-9 text-leaf-dark" />
                </div>
                <div className="min-w-0">
                  <p className="font-hand text-xl truncate">{planta.nombrePersonalizado}</p>
                  <p className="text-xs text-ink/60 truncate">{planta.especieNombre}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-ink/60 mb-1">
                  <span>{planta.etapaActual}</span>
                  <span>{progreso}/{ETAPAS.length}</span>
                </div>
                <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-leaf"
                    style={{ width: `${(progreso / ETAPAS.length) * 100}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
