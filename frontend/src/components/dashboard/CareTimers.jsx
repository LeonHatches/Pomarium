import React from "react";
import { obtenerCuidados, buscarEspecie } from "../../data/catalogoPlantas";
import { IconGota, IconSol, IconNutriente } from "../../assets/icons";

/**
 * CareTimers.jsx
 * -----------------------------------------------------------------------
 * Three circular care timers in sketchy UI style matching the mockup.
 * Each ring uses hand-drawn wobbly SVG paths for both background and progress.
 * The icon sits inside the ring with the value text overlaid below.
 * Pressing the action button resets the timer for that care type.
 */

const RING_SIZE = 130;
const STROKE_WIDTH = 14;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2 - 2;

/**
 * Generates a slightly wobbly circle path to simulate hand-drawn look.
 * Uses 8 control points with small offsets for organic feel.
 */
function sketchyCirclePath(cx, cy, r) {
  const points = 8;
  const wobble = 3;
  const offsets = [
    [1.2, -0.8], [-1.5, 1.3], [0.9, -1.4], [-1.1, 0.7],
    [1.6, -0.5], [-0.8, 1.8], [0.5, -1.2], [-1.3, 0.9],
  ];
  let d = "";
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI - Math.PI / 2;
    const [ox, oy] = offsets[i % offsets.length];
    const x = cx + (r + ox * wobble) * Math.cos(angle);
    const y = cy + (r + oy * wobble) * Math.sin(angle);
    if (i === 0) d += `M ${x} ${y} `;
    else {
      const prevAngle = ((i - 0.5) / points) * 2 * Math.PI - Math.PI / 2;
      const cpx = cx + (r + ox * wobble * 0.5) * Math.cos(prevAngle);
      const cpy = cy + (r + oy * wobble * 0.5) * Math.sin(prevAngle);
      d += `Q ${cpx} ${cpy} ${x} ${y} `;
    }
  }
  return d + "Z";
}

/**
 * Generates a wobbly arc path for the progress indicator.
 * Starts at -90deg (top) and sweeps clockwise by the given fraction.
 */
function sketchyArcPath(cx, cy, r, fraction, startAngle = -Math.PI / 2) {
  if (fraction <= 0) return "";
  const endAngle = startAngle + fraction * 2 * Math.PI;
  const points = 16;
  const wobble = 2.5;
  const offsets = [
    [1.1, -0.7], [-1.3, 1.1], [0.8, -1.2], [-0.9, 0.6],
    [1.4, -0.4], [-0.7, 1.5], [0.4, -1.0], [-1.1, 0.8],
    [1.0, -0.6], [-1.2, 0.9], [0.7, -1.1], [-0.8, 0.5],
    [1.3, -0.3], [-0.6, 1.3], [0.5, -0.9], [-1.0, 0.7],
  ];
  let d = "";
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const angle = startAngle + t * (endAngle - startAngle);
    const [ox, oy] = offsets[i % offsets.length];
    const x = cx + (r + ox * wobble) * Math.cos(angle);
    const y = cy + (r + oy * wobble) * Math.sin(angle);
    if (i === 0) d += `M ${x} ${y} `;
    else {
      const prevT = (i - 0.5) / points;
      const prevAngle = startAngle + prevT * (endAngle - startAngle);
      const [pox, poy] = offsets[(i - 1) % offsets.length];
      const cpx = cx + (r + pox * wobble * 0.6) * Math.cos(prevAngle);
      const cpy = cy + (r + poy * wobble * 0.6) * Math.sin(prevAngle);
      d += `Q ${cpx} ${cpy} ${x} ${y} `;
    }
  }
  return d;
}

function SketchyProgressRing({ tipo, value, maxVal, unit, label, sublabel, color, colorLight, Icon, onRegistrar, btnText }) {
  const fraction = maxVal > 0 ? Math.min(value / maxVal, 1) : 0;
  const center = RING_SIZE / 2;
  const isReady = fraction >= 1 && maxVal > 0;

  const progressPath = sketchyArcPath(center, center, RADIUS, fraction);
  const fullRingPath = sketchyCirclePath(center, center, RADIUS);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="sketchy-timer-ring relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          className="sketchy-timer-ring__svg"
        >
          {/* Outer sketchy background ring - lighter */}
          <path
            d={fullRingPath}
            fill="none"
            stroke={colorLight}
            strokeWidth={STROKE_WIDTH}
            opacity="0.35"
          />

          {/* Inner sketchy track - even lighter */}
          <path
            d={fullRingPath}
            fill="none"
            stroke={colorLight}
            strokeWidth={STROKE_WIDTH - 4}
            opacity="0.15"
          />

          {/* Colored progress arc - fully sketchy */}
          {fraction > 0 && (
            <path
              d={progressPath}
              fill="none"
              stroke={color}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                filter: "drop-shadow(1px 1px 0px rgba(46,42,36,0.3))",
              }}
            />
          )}

          {/* Subtle outer hand-drawn accent line */}
          <path
            d={sketchyCirclePath(center, center, RADIUS + 3)}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.15"
          />
        </svg>

        {/* Center icon */}
        <div className="sketchy-timer-ring__content">
          <Icon className="w-9 h-9 sm:w-10 sm:h-10" />
        </div>

        {/* Value label overlaid at bottom of ring */}
        <div className="sketchy-timer-ring__value">
          <span className="font-hand text-base sm:text-lg text-ink font-bold leading-none bg-cream/90 px-2.5 py-1 rounded-full sketchy-border shadow-sketchy-sm">
            {value} / {maxVal} {unit}
          </span>
        </div>

        {/* Ready indicator pulse */}
        {isReady && (
          <div className="absolute inset-0 animate-pulse" style={{ borderRadius: "50%" }}>
            <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
              <path
                d={fullRingPath}
                fill="none"
                stroke={color}
                strokeWidth="2"
                opacity="0.5"
                style={{ animation: "pulse 1.5s ease-in-out infinite" }}
              />
            </svg>
          </div>
        )}
      </div>

      {/* Labels below */}
      <div className="text-center">
        <p className="font-hand text-lg text-ink font-bold">{label}</p>
        <p className="text-xs text-ink/50 -mt-1">{sublabel}</p>
      </div>

      {/* Action Button */}
      {maxVal > 0 ? (
        <button
          onClick={() => onRegistrar(tipo)}
          className={`mt-2 font-hand text-base px-5 py-2 sketchy-border shadow-sketchy-sm transition-all hover:-translate-y-0.5 active:translate-y-0 ${
            isReady ? "bg-leaf text-cream shadow-sketchy" : "bg-cream-dark text-ink"
          }`}
          disabled={!isReady}
        >
          {btnText}
        </button>
      ) : (
        <div className="mt-2 font-hand text-sm px-4 py-1 text-ink/40 italic">
          No requiere
        </div>
      )}
    </div>
  );
}

function calcularTranscurrido(planta, tipo, unidad) {
  const lastTimeStr = planta.historialCuidados?.[tipo] || planta.fechaInicio;
  const lastTime = lastTimeStr ? new Date(lastTimeStr).getTime() : Date.now();
  const diffMs = Math.max(0, Date.now() - lastTime);

  if (unidad === "días") {
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  } else if (unidad === "h") {
    return Math.floor(diffMs / (1000 * 60 * 60));
  }
  return 0;
}

export default function CareTimers({ planta, onRegistrarCuidado }) {
  const etapaActual = planta.etapaActual || "Brote";
  const cuidados = obtenerCuidados(planta.especieId, etapaActual);
  const especie = buscarEspecie(planta.especieId);

  const transAgua = calcularTranscurrido(planta, "agua", cuidados.agua.unidad);
  const transLuz = calcularTranscurrido(planta, "luz", cuidados.luz.unidad);
  const transNutrientes = calcularTranscurrido(planta, "nutrientes", cuidados.nutrientes.unidad);

  return (
    <div className="dashboard-section" style={{ animationDelay: "0.3s" }}>
      {/* Section header with sketchy underline */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-8 px-2">
        <h2 className="font-hand text-2xl sm:text-3xl text-ink">
          Cuidados · {etapaActual}
        </h2>
        <p className="text-sm text-ink/50 italic font-hand">
          {especie?.nombre || planta.especieNombre} · {DURACIONES_ETAPA[etapaActual] || ""}
        </p>
      </div>

      {/* Three sketchy rings */}
      <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-16">
        <SketchyProgressRing
          tipo="agua"
          value={transAgua}
          maxVal={cuidados.agua.valor}
          unit={cuidados.agua.unidad}
          label="Agua"
          sublabel={cuidados.agua.tipo}
          color="#4A90D9"
          colorLight="#A8CCF0"
          Icon={IconGota}
          onRegistrar={onRegistrarCuidado}
          btnText="Regar"
        />
        <SketchyProgressRing
          tipo="luz"
          value={transLuz}
          maxVal={cuidados.luz.valor}
          unit={cuidados.luz.unidad}
          label="Luz solar"
          sublabel={cuidados.luz.tipo}
          color="#E8A838"
          colorLight="#F5D18E"
          Icon={IconSol}
          onRegistrar={onRegistrarCuidado}
          btnText="Registrar"
        />
        <SketchyProgressRing
          tipo="nutrientes"
          value={transNutrientes}
          maxVal={cuidados.nutrientes.valor}
          unit={cuidados.nutrientes.unidad}
          label="Nutrientes"
          sublabel={cuidados.nutrientes.tipo}
          color="#8B6F47"
          colorLight="#C4A882"
          Icon={IconNutriente}
          onRegistrar={onRegistrarCuidado}
          btnText="Abonar"
        />
      </div>
    </div>
  );
}

/** Duration labels for the section subtitle. */
const DURACIONES_ETAPA = {
  Brote: "1 – 2 semanas",
  "Etapa Vegetativa": "3 – 10 semanas",
  Floración: "según especie",
  Madurez: "permanente",
};