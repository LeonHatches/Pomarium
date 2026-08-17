import React from "react";
import { useNavigate } from "react-router-dom";
import { IconFlor } from "../../assets/icons";
import { useI18n } from "../../i18n/I18nContext";

/**
 * PlantHeader.jsx
 * -----------------------------------------------------------------------
 * Dashboard top bar: seedling logo / branding on the left, "Cambiar
 * planta" button (with rose icon) on the right. Matches the mockup's
 * sketchy header style.
 */
export default function PlantHeader() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <header className="flex items-center justify-between py-4 px-2 dashboard-section" style={{ animationDelay: "0s" }}>
      {/* Logo + branding */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 sketchy-border bg-cream-dark flex items-center justify-center shadow-sketchy-sm">
          <span className="text-2xl" role="img" aria-label="Seedling">🌱</span>
        </div>
        <div>
          <h1 className="font-hand text-2xl sm:text-3xl text-ink leading-none">Pomarium</h1>
          <p className="text-xs sm:text-sm text-ink/60 italic">{t("dashboard.tagline")}</p>
        </div>
      </div>

      {/* Cambiar planta button */}
      <button
        id="btn-cambiar-planta"
        onClick={() => navigate("/mis-plantas")}
        className="sketchy-border bg-mustard text-ink font-hand text-base sm:text-lg px-4 sm:px-5 py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform flex items-center gap-2"
      >
        <IconFlor className="w-5 h-5 text-ink" />
        <span className="hidden sm:inline">{t("dashboard.changePlant")}</span>
        <span className="sm:hidden">{t("dashboard.changePlantShort")}</span>
      </button>
    </header>
  );
}
