import React, { useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import { IconCerrar } from "../assets/icons";

/**
 * ModalEliminar.jsx
 * -----------------------------------------------------------------------
 * Modal de confirmación de seguridad para eliminar una planta.
 * Sigue el estilo Sketchy UI del proyecto y usa el sistema i18n.
 *
 * Props:
 *   - abierto      → boolean
 *   - planta       → { id, nombrePersonalizado, ... }
 *   - onConfirmar  → async (plantaId) => void
 *   - onCancelar   → () => void
 */
export default function ModalEliminar({ abierto, planta, onConfirmar, onCancelar }) {
  const { t } = useI18n();
  const [eliminando, setEliminando] = useState(false);

  if (!abierto || !planta) return null;

  const manejarConfirmar = async () => {
    setEliminando(true);
    try {
      await onConfirmar(planta.id);
    } finally {
      setEliminando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/40 flex items-center justify-center z-50 p-4">
      <div className="sketchy-border bg-cream shadow-sketchy p-6 w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-hand text-2xl text-coral">
            {t("misPlantas.deleteTitle")}
          </h2>
          <button
            onClick={onCancelar}
            disabled={eliminando}
            className="sketchy-border w-8 h-8 flex items-center justify-center bg-cream-dark shadow-sketchy-sm"
          >
            <IconCerrar className="w-4 h-4" />
          </button>
        </div>

        {/* Confirmation message */}
        <p className="text-sm text-ink/80 mb-6 leading-relaxed">
          {t("misPlantas.deleteConfirm", planta.nombrePersonalizado)}
        </p>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancelar}
            disabled={eliminando}
            className="sketchy-border flex-1 bg-cream-dark font-hand text-lg py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform disabled:opacity-60"
          >
            {t("misPlantas.cancel")}
          </button>
          <button
            onClick={manejarConfirmar}
            disabled={eliminando}
            className="sketchy-border flex-1 bg-coral text-cream font-hand text-lg py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform disabled:opacity-60"
          >
            {eliminando ? t("misPlantas.deleting") : t("misPlantas.delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
