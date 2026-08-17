import React, { useState } from "react";
import { subirFotoPlanta } from "../firebase";
import { ETAPAS } from "../data/catalogoPlantas";
import { IconCamara, IconCerrar } from "../assets/icons";
import { useI18n } from "../i18n/I18nContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000');

/**
 * ModalDesbloqueo.jsx
 * -----------------------------------------------------------------------
 * El usuario sube una foto de su planta. La imagen se sube a Firebase
 * Storage; con la URL de descarga se llama al backend, que usa Gemini
 * para verificar si la foto corresponde a la planta/etapa esperada.
 *
 * Al validar con éxito (requerimiento 8): el candado de esa etapa se
 * desbloquea permanentemente y la foto subida reemplaza al ícono
 * genérico — eso se resuelve en App.jsx (onDesbloqueado) guardando la
 * foto dentro de `planta.etapas[etapa].fotoURL` en Firestore.
 */
export default function ModalDesbloqueo({
  abierto,
  onCerrar,
  uid,
  planta, // { id, especieNombre, etapaActual, etapas }
  onDesbloqueado, // callback(etapaDesbloqueada, fotoURL)
}) {
  const [archivo, setArchivo] = useState(null);
  const [previsualizacion, setPrevisualizacion] = useState(null);
  const [estado, setEstado] = useState("idle"); // idle | subiendo | validando | ok | error
  const [mensaje, setMensaje] = useState("");
  const { t } = useI18n();

  if (!abierto) return null;

  // Find the first stage that hasn't been unlocked yet (could be the current one)
  const etapaObjetivo = ETAPAS.find(
    (et) => !planta.etapas?.[et]?.desbloqueada
  ) || ETAPAS[ETAPAS.length - 1];

  const manejarArchivo = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setArchivo(f);
    setPrevisualizacion(URL.createObjectURL(f));
    setEstado("idle");
    setMensaje("");
  };

  const manejarValidacion = async () => {
    if (!archivo) return;
    try {
      setEstado("subiendo");
      const urlDescarga = await subirFotoPlanta(uid, planta.id, etapaObjetivo, archivo);

      setEstado("validando");
      const respuesta = await fetch(`${API_BASE_URL}/api/validar-planta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: urlDescarga,
          nombrePlanta: planta.especieNombre,
          etapaActual: etapaObjetivo,
        }),
      });

      if (!respuesta.ok) throw new Error("Error de validación en el servidor");
      const data = await respuesta.json();

      if (data.esValida) {
        setEstado("ok");
        setMensaje(t("modal.successMsg"));
        onDesbloqueado?.(etapaObjetivo, urlDescarga);
      } else {
        setEstado("error");
        setMensaje(t("modal.failMsg"));
      }
    } catch (err) {
      setEstado("error");
      setMensaje(t("modal.errorMsg"));
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/40 flex items-center justify-center z-50 p-4">
      <div className="sketchy-border bg-cream shadow-sketchy p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-hand text-2xl text-leaf-dark">
            {t("modal.validateTitle", t(`category.${planta?.especieNombre}`) || planta?.especieNombre)}
          </h2>
          <button
            onClick={onCerrar}
            className="sketchy-border w-8 h-8 flex items-center justify-center bg-clay text-cream shadow-sketchy-sm"
          >
            <IconCerrar className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-ink/60 mb-3">
          {t("modal.validateHint", t(`stage.${etapaObjetivo}`))}
        </p>

        <label className="sketchy-border bg-cream-dark flex flex-col items-center justify-center gap-2 p-6 cursor-pointer shadow-sketchy-sm">
          {previsualizacion ? (
            <img
              src={previsualizacion}
              alt={t("modal.photoAlt")}
              className="max-h-48 object-contain"
            />
          ) : (
            <>
              <IconCamara className="w-10 h-10 text-leaf-dark" />
              <span className="text-sm text-ink/70">{t("modal.uploadPrompt")}</span>
            </>
          )}
          <input type="file" accept="image/*" onChange={manejarArchivo} className="hidden" />
        </label>

        {mensaje && (
          <p className={`text-sm mt-3 ${estado === "ok" ? "text-leaf-dark" : "text-coral"}`}>
            {mensaje}
          </p>
        )}

        <button
          onClick={manejarValidacion}
          disabled={!archivo || estado === "subiendo" || estado === "validando"}
          className="sketchy-border w-full mt-5 bg-leaf text-cream font-hand text-lg py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform disabled:opacity-60"
        >
          {estado === "subiendo" && t("modal.uploading")}
          {estado === "validando" && t("modal.analyzing")}
          {(estado === "idle" || estado === "ok" || estado === "error") && t("modal.validateBtn")}
        </button>
      </div>
    </div>
  );
}
