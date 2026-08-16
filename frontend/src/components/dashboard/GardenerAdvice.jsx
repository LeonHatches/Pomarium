import React from "react";
import { Jardinero } from "../../assets/character";

/**
 * GardenerAdvice.jsx
 * -----------------------------------------------------------------------
 * Don Tomás the gardener with a speech bubble containing stage-specific
 * plant care advice. The bubble has a triangular pointer pointing down
 * to the character, matching the mockup's comic-book style.
 */

const CONSEJOS_POR_ETAPA = {
  Brote:
    "¡Tu plantita apenas despierta! Mantenle la tierra húmeda pero sin encharcar, y no la expongas al sol directo todavía.",
  "Etapa Vegetativa":
    "\"Cuando veas que las costillas se le marcan, ahí sí, dale un buen trago de agua y deja que se seque del todo. Y gíralo cada semana, que si no te crece torcido buscando la ventana.\"",
  Floración:
    "¡Se acercan las flores! No la muevas de lugar ahora. Dale un poquito de abono rico en fósforo y sé paciente — la belleza toma su tiempo.",
  Madurez:
    "Tu planta llegó lejos, ¡felicidades! Ahora toca mantenerla feliz: riego espaciado, buena luz y un abono suave cada mes.",
};

export default function GardenerAdvice({ planta }) {
  const etapaActual = planta.etapaActual || "Brote";
  const consejo = CONSEJOS_POR_ETAPA[etapaActual] || CONSEJOS_POR_ETAPA["Brote"];

  return (
    <div
      className="flex flex-col items-center gap-2 mt-4 dashboard-section"
      style={{ animationDelay: "0.4s" }}
    >
      {/* Speech bubble */}
      <div className="speech-bubble max-w-lg mx-auto">
        <p className="font-hand text-lg sm:text-xl text-ink/90 text-center leading-relaxed">
          {consejo}
        </p>
      </div>

      {/* Don Tomás */}
      <div className="flex flex-col items-center mt-2">
        <Jardinero className="w-28 h-28 sm:w-36 sm:h-36" />
        <p className="font-hand text-base text-ink/70 mt-1">Don Tomás</p>
      </div>
    </div>
  );
}
