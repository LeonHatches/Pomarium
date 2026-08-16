import React from "react";
import { ETAPAS, obtenerMetadata } from "../../data/catalogoPlantas";
import { obtenerIconoPlanta } from "../../assets/plants";
import { indiceEtapa } from "../../utils/etapas";
import { useI18n } from "../../i18n/I18nContext";

/**
 * PlantProfile.jsx
 * -----------------------------------------------------------------------
 * Central card matching the mockup: tags, big name, illustration with
 * stage label underneath, and "Árbol de evolución" sketchy progress bar.
 */
export default function PlantProfile({ planta }) {
  const { t } = useI18n();
  const metadata = obtenerMetadata(planta.especieId);
  const IconoEspecie = obtenerIconoPlanta(planta.especieId);
  const etapaActual = planta.etapaActual || "Brote";
  const idx = indiceEtapa(etapaActual);
  const progreso = ((idx + 1) / ETAPAS.length) * 100;

  return (
    <div
      className="sketchy-card px-6 sm:px-10 py-8 sm:py-10 flex flex-col items-center gap-5 dashboard-section"
      style={{ animationDelay: "0.1s" }}
    >
      {/* Tags */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <span className="tag-outline">{t(`category.${metadata.familia}`) || metadata.familia}</span>
        <span className="tag-filled">{t(`difficulty.${metadata.dificultad}`) || metadata.dificultad}</span>
      </div>

      {/* Plant custom name */}
      <h2 className="font-shantell text-5xl sm:text-6xl text-ink text-center leading-tight font-bold">
        {planta.nombrePersonalizado}
      </h2>

      {/* Scientific / common name */}
      <p className="text-ink/60 text-sm sm:text-base italic text-center">
        {t(`category.${planta.especieNombre}`) || planta.especieNombre}
        {metadata.cientifico && ` · "${metadata.cientifico}"`}
      </p>

      {/* Large plant illustration in a sketchy frame */}
      <div className="sketchy-border p-6 sm:p-8 bg-cream/50 shadow-sketchy-sm mt-2 flex flex-col items-center">
        <IconoEspecie className="w-32 h-32 sm:w-44 sm:h-44" />

        {/* Decorative soil dots below plant */}
        <div className="flex items-center gap-2 mt-3 text-ink/30">
          <span className="text-lg">·</span>
          <span className="text-sm">·</span>
          <span className="text-lg">·</span>
          <span className="text-sm">·</span>
          <span className="mx-0.5 text-lg">·</span>
          <span className="text-sm">·</span>
          <span className="text-lg">·</span>
          <span className="text-sm">·</span>
        </div>
      </div>

      {/* Current stage label below the plant frame */}
      <div className="stage-badge text-base">
        {t(`stage.${etapaActual}`)}
      </div>

      {/* ── Árbol de evolución ── */}
      <div className="w-full max-w-sm mt-2">
        <h3 className="font-hand text-xl text-ink mb-3 text-center">
          {t("profile.evolutionTree")}
        </h3>

        {/* Sketchy progress bar */}
        <div className="evolution-bar-sketchy">
          <div className="evolution-bar-sketchy__fill" style={{ width: `${progreso}%` }} />
          {/* Stage markers */}
          {ETAPAS.map((etapa, i) => {
            const pos = ((i + 1) / ETAPAS.length) * 100;
            const desbloqueada = !!planta.etapas?.[etapa]?.desbloqueada;
            return (
              <div
                key={etapa}
                className="evolution-bar-sketchy__marker"
                style={{ left: `${pos}%` }}
              >
                <div className={`evolution-bar-sketchy__dot ${desbloqueada ? "evolution-bar-sketchy__dot--active" : ""}`} />
              </div>
            );
          })}
        </div>

        {/* Stage labels below the bar */}
        <div className="flex justify-between mt-2 px-1">
          {ETAPAS.map((etapa, i) => (
            <span
              key={etapa}
              className={`text-xs font-hand ${
                i === idx ? "text-leaf-dark font-bold" : "text-ink/40"
              }`}
              style={{ width: `${100 / ETAPAS.length}%`, textAlign: "center" }}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
