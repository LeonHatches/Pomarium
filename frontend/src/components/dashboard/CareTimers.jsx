import React from "react";
import { obtenerCuidados, buscarEspecie } from "../../data/catalogoPlantas";
import { IconGota, IconSol, IconNutriente } from "../../assets/icons";

/**
 * CareTimers.jsx
 * -----------------------------------------------------------------------
 * Three circular care timers in sketchy UI style matching the mockup.
 * Each ring is drawn with thick, hand-drawn looking strokes via SVG paths
 * instead of perfect geometric circles. The icon sits inside the ring
 * with the value text overlaid below.
 */

const RING_SIZE = 130;
const STROKE_WIDTH = 12;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2 - 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Max values for computing the progress arc fraction. */
const MAX_VALUES = { agua: 30, luz: 12, nutrientes: 60 };

/**
 * Generates a slightly wobbly circle path to simulate hand-drawn look.
 * Uses 8 control points with small random offsets baked in.
 */
function sketchyCirclePath(cx, cy, r, seed = 0) {
  const points = 8;
  const wobble = 2.5;
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

function SketchyProgressRing({ value, unit, label, sublabel, color, colorLight, Icon, maxVal }) {
  const fraction = Math.min(value / maxVal, 1);
  const offset = CIRCUMFERENCE * (1 - fraction);
  const center = RING_SIZE / 2;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="sketchy-timer-ring" style={{ width: RING_SIZE, height: RING_SIZE }}>
        {/* SVG ring */}
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          className="sketchy-timer-ring__svg"
        >
          {/* Outer sketchy background ring */}
          <path
            d={sketchyCirclePath(center, center, RADIUS)}
            fill="none"
            stroke={colorLight}
            strokeWidth={STROKE_WIDTH}
            opacity="0.4"
          />

          {/* Background track (clean circle) */}
          <circle
            cx={center}
            cy={center}
            r={RADIUS}
            fill="none"
            stroke={colorLight}
            strokeWidth={STROKE_WIDTH - 2}
            opacity="0.3"
          />

          {/* Colored progress arc */}
          <circle
            cx={center}
            cy={center}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${center} ${center})`}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)" }}
          />

          {/* Outer sketchy line (hand-drawn feel) */}
          <path
            d={sketchyCirclePath(center, center, RADIUS + 2, 1)}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.2"
          />
        </svg>

        {/* Center content */}
        <div className="sketchy-timer-ring__content">
          <Icon className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>

        {/* Value label overlaid at bottom of ring */}
        <div className="sketchy-timer-ring__value">
          <span className="font-hand text-lg sm:text-xl text-ink font-bold leading-none">
            {value} {unit}
          </span>
        </div>
      </div>

      {/* Labels below */}
      <p className="font-hand text-lg text-ink font-bold">{label}</p>
      <p className="text-xs text-ink/50 -mt-2">{sublabel}</p>
    </div>
  );
}

export default function CareTimers({ planta }) {
  const etapaActual = planta.etapaActual || "Brote";
  const cuidados = obtenerCuidados(planta.especieId, etapaActual);
  const especie = buscarEspecie(planta.especieId);

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
      <div className="flex flex-wrap items-start justify-center gap-10 sm:gap-16">
        <SketchyProgressRing
          value={cuidados.agua.valor}
          unit={cuidados.agua.unidad}
          label="Agua"
          sublabel={cuidados.agua.tipo}
          color="#4A90D9"
          colorLight="#A8CCF0"
          Icon={IconGota}
          maxVal={MAX_VALUES.agua}
        />
        <SketchyProgressRing
          value={cuidados.luz.valor}
          unit={cuidados.luz.unidad}
          label="Luz solar"
          sublabel={cuidados.luz.tipo}
          color="#E8A838"
          colorLight="#F5D18E"
          Icon={IconSol}
          maxVal={MAX_VALUES.luz}
        />
        <SketchyProgressRing
          value={cuidados.nutrientes.valor}
          unit={cuidados.nutrientes.unidad}
          label="Nutrientes"
          sublabel={cuidados.nutrientes.tipo}
          color="#8B6F47"
          colorLight="#C4A882"
          Icon={IconNutriente}
          maxVal={MAX_VALUES.nutrientes}
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
