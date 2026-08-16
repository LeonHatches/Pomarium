import React, { useState, useEffect } from "react";
import { obtenerCuidados, buscarEspecie } from "../../data/catalogoPlantas";
import { IconGota, IconSol, IconNutriente } from "../../assets/icons";
import { useI18n } from "../../i18n/I18nContext";

/**
 * CareTimers.jsx
 * -----------------------------------------------------------------------
 * Three circular care timers in sketchy UI style.
 *
 * LOGIC:
 *   - Press "Regar"/"Abonar"/"Registrar" → ring FILLS to 100% (care given)
 *   - Over time → ring DRAINS toward 0% (care needed again)
 *   - At 0% → button turns green = needs care now
 *   - Never cared for → ring starts empty (0%) = needs first care
 *
 * Live timer updates every 30 seconds so progress bars drain in real time.
 * Counter text is BELOW the ring, not overlapping it.
 */

const RING_SIZE = 130;
const STROKE_WIDTH = 14;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2 - 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Generates a slightly wobbly circle path to simulate hand-drawn look.
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

function SketchyProgressRing({
  tipo, remaining, maxVal, unit, label, sublabel,
  color, colorLight, Icon, onRegistrar, btnText, t
}) {
  // remaining = how many days/hours of "charge" left
  // fraction: 1 = full (just cared for), 0 = empty (needs care)
  const fraction = maxVal > 0 ? Math.min(Math.max(remaining / maxVal, 0), 1) : 1;
  const center = RING_SIZE / 2;
  const needsCare = remaining <= 0 && maxVal > 0;

  // strokeDashoffset: 0 = full circle, CIRCUMFERENCE = empty circle
  const strokeDashoffset = CIRCUMFERENCE * (1 - fraction);

  const fullRingPath = sketchyCirclePath(center, center, RADIUS);

  const displayText = remaining > 0
    ? t("care.remaining", remaining, t(`unit.${unit}`))
    : t("care.needsNow", label.toLowerCase());

  return (
    <div className="flex flex-col items-center gap-2" style={{ width: 150 }}>
      {/* Ring — icon only inside, no text overlay */}
      <div className="sketchy-timer-ring relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          className="sketchy-timer-ring__svg"
        >
          {/* Outer sketchy background ring */}
          <path
            d={fullRingPath}
            fill="none"
            stroke={colorLight}
            strokeWidth={STROKE_WIDTH}
            opacity="0.3"
          />

          {/* Inner sketchy track */}
          <path
            d={sketchyCirclePath(center, center, RADIUS - 3)}
            fill="none"
            stroke={colorLight}
            strokeWidth={STROKE_WIDTH - 4}
            opacity="0.12"
          />

          {/* Colored progress arc — drains clockwise */}
          <circle
            cx={center}
            cy={center}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${center} ${center})`}
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
              filter: "drop-shadow(1px 1px 0px rgba(46,42,36,0.3))",
            }}
          />

          {/* Hand-drawn accent line */}
          <path
            d={sketchyCirclePath(center, center, RADIUS + 3)}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.1"
          />
        </svg>

        {/* Center icon only */}
        <div className="sketchy-timer-ring__content">
          <Icon className="w-9 h-9 sm:w-10 sm:h-10" />
        </div>

        {/* Pulse animation when needs care */}
        {needsCare && (
          <div className="absolute inset-0 animate-pulse pointer-events-none" style={{ borderRadius: "50%" }}>
            <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
              <path d={fullRingPath} fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
            </svg>
          </div>
        )}
      </div>

      {/* Label + sublabel */}
      <div className="text-center">
        <p className="font-hand text-lg text-ink font-bold">{label}</p>
        <p className="text-xs text-ink/50">{sublabel}</p>
      </div>

      {/* Counter text — BELOW the ring, never overlapping */}
      {maxVal > 0 ? (
        <div className="text-center">
          <span
            className={`font-hand text-base font-bold leading-none px-3 py-1 inline-block sketchy-border ${
              needsCare
                ? "bg-leaf text-cream"
                : "bg-cream-dark text-ink"
            }`}
          >
            {displayText}
          </span>
        </div>
      ) : (
        <div className="text-center font-hand text-sm text-ink/40 italic py-1">
          {t("care.notRequired")}
        </div>
      )}

      {/* Action Button */}
      {maxVal > 0 ? (
        <button
          onClick={() => onRegistrar(tipo)}
          className={`font-hand text-base px-5 py-2 sketchy-border shadow-sketchy-sm transition-all hover:-translate-y-0.5 active:translate-y-0 ${
            needsCare
              ? "bg-leaf text-cream shadow-sketchy"
              : "bg-cream-dark text-ink"
          }`}
        >
          {needsCare ? t(`care.${tipo}Now`) : btnText}
        </button>
      ) : (
        <div className="font-hand text-sm px-4 py-1 text-ink/40 italic">
          {t("care.notRequiredShort")}
        </div>
      )}
    </div>
  );
}

/**
 * Calculates how many days/hours of "charge" remain since last care.
 * - Never cared for → 0 (empty ring, needs care immediately)
 * - Just cared for → maxVal (full ring)
 * - Over time → drains from maxVal toward 0
 */
function calcularRestante(planta, tipo, unidad, maxVal) {
  const lastTimeStr = planta.historialCuidados?.[tipo];

  // Never cared for → ring empty, needs first care
  if (!lastTimeStr) return 0;

  const lastTime = new Date(lastTimeStr).getTime();
  const diffMs = Math.max(0, Date.now() - lastTime);

  let elapsed;
  if (unidad === "días") {
    elapsed = diffMs / (1000 * 60 * 60 * 24); // fractional days
  } else if (unidad === "h") {
    elapsed = diffMs / (1000 * 60 * 60); // fractional hours
  } else {
    elapsed = 0;
  }

  // Remaining = max - elapsed, clamped to [0, maxVal]
  return Math.max(0, Math.round((maxVal - elapsed) * 10) / 10);
}

export default function CareTimers({ planta, onRegistrarCuidado }) {
  const { t } = useI18n();
  const etapaActual = planta.etapaActual || "Brote";
  const cuidados = obtenerCuidados(planta.especieId, etapaActual);
  const especie = buscarEspecie(planta.especieId);

  // Live timer: re-render every 30s so rings drain smoothly over time
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);
  void tick;

  const remAgua = calcularRestante(planta, "agua", cuidados.agua.unidad, cuidados.agua.valor);
  const remLuz = calcularRestante(planta, "luz", cuidados.luz.unidad, cuidados.luz.valor);
  const remNutrientes = calcularRestante(planta, "nutrientes", cuidados.nutrientes.unidad, cuidados.nutrientes.valor);

  return (
    <div className="dashboard-section" style={{ animationDelay: "0.3s" }}>
      {/* Section header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-8 px-2">
        <h2 className="font-hand text-2xl sm:text-3xl text-ink">
          {t("care.sectionTitle", t(`stage.${etapaActual}`))}
        </h2>
        <p className="text-sm text-ink/50 italic font-hand">
          {t(`category.${especie?.nombre}`) || especie?.nombre || planta.especieNombre} · {t(`lifecycle.duration.${etapaActual}`) || ""}
        </p>
      </div>

      {/* Three sketchy rings */}
      <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-12">
        <SketchyProgressRing
          tipo="agua"
          remaining={remAgua}
          maxVal={cuidados.agua.valor}
          unit={cuidados.agua.unidad}
          label={t("care.water")}
          sublabel={cuidados.agua.tipo}
          color="#4A90D9"
          colorLight="#A8CCF0"
          Icon={IconGota}
          onRegistrar={onRegistrarCuidado}
          btnText={t("care.waterBtn")}
          t={t}
        />
        <SketchyProgressRing
          tipo="luz"
          remaining={remLuz}
          maxVal={cuidados.luz.valor}
          unit={cuidados.luz.unidad}
          label={t("care.sunlight")}
          sublabel={cuidados.luz.tipo}
          color="#E8A838"
          colorLight="#F5D18E"
          Icon={IconSol}
          onRegistrar={onRegistrarCuidado}
          btnText={t("care.sunBtn")}
          t={t}
        />
        <SketchyProgressRing
          tipo="nutrientes"
          remaining={remNutrientes}
          maxVal={cuidados.nutrientes.valor}
          unit={cuidados.nutrientes.unidad}
          label={t("care.nutrients")}
          sublabel={cuidados.nutrientes.tipo}
          color="#8B6F47"
          colorLight="#C4A882"
          Icon={IconNutriente}
          onRegistrar={onRegistrarCuidado}
          btnText={t("care.nutrientsBtn")}
          t={t}
        />
      </div>
    </div>
  );
}
