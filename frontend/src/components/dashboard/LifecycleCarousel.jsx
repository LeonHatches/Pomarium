import React, { useState } from "react";
import { ETAPAS } from "../../data/catalogoPlantas";
import { obtenerIconoPlanta } from "../../assets/plants";
import { indiceEtapa } from "../../utils/etapas";
import { IconFlechaIzq, IconFlechaDer, IconCamara } from "../../assets/icons";

/**
 * LifecycleCarousel.jsx
 * -----------------------------------------------------------------------
 * Sketchy UI 3-card carousel showing plant lifecycle stages.
 * Active card: large, green sketchy border, full detail.
 * Side cards: scaled down, greyed, with silhouette feel.
 * Matches the mockup with hand-drawn borders and organic styling.
 */

/** Duration labels per stage. */
const DURACIONES_ETAPA = {
  Brote: "1 – 2 semanas",
  "Etapa Vegetativa": "3 – 10 semanas",
  Floración: "según especie",
  Madurez: "permanente",
};

function getCardClass(offset) {
  if (offset === 0) return "carousel-card carousel-card--active";
  if (offset === -1) return "carousel-card carousel-card--prev";
  if (offset === 1) return "carousel-card carousel-card--next";
  return "carousel-card carousel-card--hidden";
}

function StageCard({ etapa, indice, planta, offset, onSubirFoto }) {
  const IconoEspecie = obtenerIconoPlanta(planta.especieId);
  const info = planta.etapas?.[etapa];
  const desbloqueada = !!info?.desbloqueada;
  const etapaActualNombre = planta.etapaActual || "Brote";
  const idxActual = indiceEtapa(etapaActualNombre);
  const esActual = etapa === etapaActualNombre;
  const etapaActualYaDesbloqueada = !!planta.etapas?.[etapaActualNombre]?.desbloqueada;
  // Show "Subir foto" on current stage if not unlocked,
  // OR on the next stage if the current one is already unlocked (to advance)
  const puedeSubirFoto = !desbloqueada && (
    esActual || (indice === idxActual + 1 && etapaActualYaDesbloqueada)
  );
  const diasVida = planta.diasDeVida || 0;
  const isActive = offset === 0;

  return (
    <div className={getCardClass(offset)}>
      {/* Stage number badge + name */}
      <div className="flex items-center gap-2 self-start w-full">
        <span
          className="w-7 h-7 flex items-center justify-center font-hand text-sm font-bold text-cream"
          style={{
            background: desbloqueada ? "#4E7A51" : "rgba(46,42,36,0.3)",
            border: "2px solid #2E2A24",
            borderRadius: "4px",
          }}
        >
          {indice + 1}
        </span>
        <span className="font-hand text-xl text-ink font-bold">{etapa}</span>
      </div>

      {/* Sketchy divider */}
      {isActive && <hr className="sketchy-divider" />}

      {/* Plant illustration */}
      <div
        className={`flex items-center justify-center py-3 ${
          !desbloqueada ? "opacity-25 grayscale" : ""
        }`}
      >
        {info?.fotoURL ? (
          <img
            src={info.fotoURL}
            alt={`${etapa} validada`}
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
            style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
          />
        ) : (
          <IconoEspecie className={`${isActive ? "w-28 h-28 sm:w-32 sm:h-32" : "w-20 h-20"}`} />
        )}
      </div>

      {/* Soil dots decoration */}
      {isActive && (
        <div className="flex items-center gap-1 text-ink/25 text-sm">
          <span>·</span><span>·</span><span>·</span>
          <span className="mx-0.5">·</span>
          <span>·</span><span>·</span><span>·</span>
        </div>
      )}

      {/* Duration */}
      <p className="text-sm text-ink/60 text-center font-hand">{DURACIONES_ETAPA[etapa]}</p>

      {/* Status badge */}
      {desbloqueada ? (
        <span className="stage-badge stage-badge--completed text-sm">
          ✓ día {diasVida ?? "?"}
        </span>
      ) : puedeSubirFoto ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSubirFoto?.();
          }}
          className="stage-badge stage-badge--pending text-sm flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <IconCamara className="w-4 h-4" /> Subir foto
        </button>
      ) : (
        <span className="text-xs text-ink/30 font-hand italic">Bloqueada</span>
      )}
    </div>
  );
}

export default function LifecycleCarousel({ planta, onAbrirValidacion }) {
  const etapaActualNombre = planta.etapaActual || "Brote";
  const idxActual = indiceEtapa(etapaActualNombre);
  const [activeIdx, setActiveIdx] = useState(idxActual);

  const goPrev = () => setActiveIdx((prev) => Math.max(0, prev - 1));
  const goNext = () => setActiveIdx((prev) => Math.min(ETAPAS.length - 1, prev + 1));

  return (
    <div className="dashboard-section" style={{ animationDelay: "0.2s" }}>
      {/* Section header — sketchy style */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="font-hand text-2xl sm:text-3xl text-ink font-bold">Ciclo de vida</h2>
        <div className="flex items-center gap-2">
          <button
            id="btn-carousel-prev"
            onClick={goPrev}
            disabled={activeIdx === 0}
            className="sketchy-border w-10 h-10 flex items-center justify-center bg-cream shadow-sketchy-sm disabled:opacity-30 hover:-translate-y-0.5 transition-transform"
          >
            <IconFlechaIzq className="w-5 h-5 text-ink" />
          </button>
          <button
            id="btn-carousel-next"
            onClick={goNext}
            disabled={activeIdx === ETAPAS.length - 1}
            className="sketchy-border w-10 h-10 flex items-center justify-center bg-ink text-cream shadow-sketchy-sm disabled:opacity-30 hover:-translate-y-0.5 transition-transform"
          >
            <IconFlechaDer className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="carousel-container">
        <div className="carousel-track">
          {ETAPAS.map((etapa, i) => (
            <StageCard
              key={etapa}
              etapa={etapa}
              indice={i}
              planta={planta}
              offset={i - activeIdx}
              onSubirFoto={onAbrirValidacion}
            />
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="carousel-dots">
        {ETAPAS.map((etapa, i) => {
          const info = planta.etapas?.[etapa];
          let dotClass = "carousel-dot";
          if (i === activeIdx) dotClass += " carousel-dot--active";
          else if (info?.desbloqueada) dotClass += " carousel-dot--completed";
          return <div key={etapa} className={dotClass} />;
        })}
      </div>
    </div>
  );
}
