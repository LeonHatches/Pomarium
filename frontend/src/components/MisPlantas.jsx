import React from "react";
import { Link } from "react-router-dom";
import { obtenerIconoPlanta } from "../assets/plants";
import { indiceEtapa } from "../utils/etapas";
import { ETAPAS } from "../data/catalogoPlantas";
import { IconAgregarPlanta, IconBasura } from "../assets/icons";
import { useI18n } from "../i18n/I18nContext";
import ModalEliminar from "./ModalEliminar";

/**
 * MisPlantas.jsx
 * -----------------------------------------------------------------------
 * Vista "Mis Plantas" enlazada desde la navbar (requerimiento 3): lista
 * todas las plantas que el usuario tiene registradas, cargadas desde
 * Firebase (requerimiento 6), con su progreso de etapa.
 */
export default function MisPlantas({ plantas, onEliminarPlanta }) {
  const { t } = useI18n();
  const [plantaAEliminar, setPlantaAEliminar] = React.useState(null);

  if (!plantas) {
    return <p className="text-center text-ink/60 mt-10">{t("misPlantas.loading")}</p>;
  }

  if (plantas.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 mt-10 text-center">
        <p className="text-ink/70">{t("misPlantas.empty")}</p>
        <Link
          to="/agregar"
          className="sketchy-border bg-leaf text-cream font-hand text-lg px-5 py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform flex items-center gap-2"
        >
          <IconAgregarPlanta className="w-5 h-5" /> {t("misPlantas.addFirst")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-hand text-3xl text-leaf-dark">{t("misPlantas.title")}</h1>
        <Link
          to="/agregar"
          className="sketchy-border bg-leaf text-cream font-hand text-lg px-4 py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform flex items-center gap-2"
        >
          <IconAgregarPlanta className="w-5 h-5" /> {t("misPlantas.addPlant")}
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
              className="relative sketchy-border bg-cream-dark p-4 flex flex-col gap-3 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform group"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setPlantaAEliminar(planta);
                }}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-cream sketchy-border shadow-sketchy-sm opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-coral hover:text-cream"
                aria-label={t("misPlantas.deleteTitle")}
              >
                <IconBasura className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 pr-8">
                <div className="w-14 h-14 rounded-full bg-leaf-light/40 flex items-center justify-center shrink-0">
                  <Icono className="w-9 h-9 text-leaf-dark" />
                </div>
                <div className="min-w-0">
                  <p className="font-hand text-xl truncate">{planta.nombrePersonalizado}</p>
                  <p className="text-xs text-ink/60 truncate">
                    {t(`plant_types.${planta.especieNombre}`) === `plant_types.${planta.especieNombre}` ? planta.especieNombre : t(`plant_types.${planta.especieNombre}`)}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-ink/60 mb-1">
                  <span>{t(`stage.${planta.etapaActual}`)}</span>
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

      <ModalEliminar
        abierto={!!plantaAEliminar}
        planta={plantaAEliminar}
        onCancelar={() => setPlantaAEliminar(null)}
        onConfirmar={async (id) => {
          await onEliminarPlanta(id);
          setPlantaAEliminar(null);
        }}
      />
    </div>
  );
}
