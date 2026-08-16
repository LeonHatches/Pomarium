import React from "react";
import { Jardinero } from "../../assets/character";
import { useI18n } from "../../i18n/I18nContext";

/**
 * GardenerAdvice.jsx
 * -----------------------------------------------------------------------
 * Don Tomás the gardener with a speech bubble containing stage-specific
 * plant care advice. The bubble has a triangular pointer pointing down
 * to the character, matching the mockup's comic-book style.
 */

export default function GardenerAdvice({ planta }) {
  const { t } = useI18n();
  const etapaActual = planta.etapaActual || "Brote";
  const consejo = t(`gardener.advice.${etapaActual}`) || t("gardener.advice.Brote");

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
        <p className="font-hand text-base text-ink/70 mt-1">{t("gardener.name")}</p>
      </div>
    </div>
  );
}
