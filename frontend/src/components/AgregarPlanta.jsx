import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { catalogoConEstadoDesbloqueo } from "../utils/desbloqueo";
import { resolverInicioPlanta } from "../utils/etapas";
import { obtenerIconoPlanta } from "../assets/plants";
import { IconCandado } from "../assets/icons";
import { useI18n } from "../i18n/I18nContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import enUS from "date-fns/locale/en-US";

/**
 * AgregarPlanta.jsx
 * -----------------------------------------------------------------------
 * Flujo completo para registrar una planta nueva:
 *   1) Elegir categoría (las bloqueadas se muestran con candado y no se
 *      pueden abrir — requerimiento 4).
 *   2) Elegir especie dentro de la categoría.
 *   3) Formulario obligatorio: nombre personalizado + tiempo exacto que
 *      lleva la planta (semanas/meses o fecha de inicio) — requerimiento 5.
 *      Con ese dato se calcula automáticamente la etapa de arranque en
 *      vez de partir siempre de "Brote".
 */
export default function AgregarPlanta({ plantasUsuario, onCrearPlanta }) {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1); // 1 categoría, 2 especie, 3 formulario
  const [categoriaElegida, setCategoriaElegida] = useState(null);
  const [especieElegida, setEspecieElegida] = useState(null);
  const { t, idioma } = useI18n();

  const [nombrePersonalizado, setNombrePersonalizado] = useState("");
  const [modoTiempo, setModoTiempo] = useState("cantidad"); // "cantidad" | "fecha"
  const [cantidad, setCantidad] = useState("0");
  const [unidad, setUnidad] = useState("semanas");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const categorias = useMemo(
    () => catalogoConEstadoDesbloqueo(plantasUsuario || []),
    [plantasUsuario]
  );

  const elegirCategoria = (cat) => {
    if (cat.bloqueada) return;
    setCategoriaElegida(cat);
    setPaso(2);
  };

  const elegirEspecie = (planta) => {
    setEspecieElegida(planta);
    setPaso(3);
  };

  const volver = () => {
    if (paso === 3) setPaso(2);
    else if (paso === 2) setPaso(1);
    else navigate("/mis-plantas");
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    setError("");

    if (!nombrePersonalizado.trim()) {
      setError(t("agregar.errorName"));
      return;
    }
    if (modoTiempo === "cantidad" && (cantidad === "" || Number(cantidad) < 0)) {
      setError(t("agregar.errorTime"));
      return;
    }
    if (modoTiempo === "fecha" && !fecha) {
      setError(t("agregar.errorDate"));
      return;
    }

    const { fechaInicio, diasDeVida, etapaInicial } = resolverInicioPlanta(
      modoTiempo,
      { cantidad, unidad, fecha },
      especieElegida.umbralesDias
    );

    const nuevaPlanta = {
      id: `${especieElegida.id}-${Date.now()}`,
      especieId: especieElegida.id,
      especieNombre: especieElegida.nombre,
      categoria: categoriaElegida.categoria,
      categoriaId: categoriaElegida.id,
      nombrePersonalizado: nombrePersonalizado.trim(),
      fechaInicio,
      diasDeVida,
      etapaActual: etapaInicial,
      etapas: {
        Brote: { desbloqueada: false, fotoURL: null, fechaDesbloqueo: null },
        "Etapa Vegetativa": { desbloqueada: etapaInicial !== "Brote", fotoURL: null, fechaDesbloqueo: null },
        Floración: {
          desbloqueada: etapaInicial === "Floración" || etapaInicial === "Madurez",
          fotoURL: null,
          fechaDesbloqueo: null,
        },
        Madurez: { desbloqueada: etapaInicial === "Madurez", fotoURL: null, fechaDesbloqueo: null },
      },
    };

    try {
      setGuardando(true);
      await onCrearPlanta(nuevaPlanta);
      navigate(`/planta/${nuevaPlanta.id}`);
    } catch (err) {
      setError(t("agregar.errorSave"));
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button
          onClick={volver}
          className="sketchy-border w-9 h-9 flex items-center justify-center bg-cream-dark shadow-sketchy-sm"
        >
          ←
        </button>
        <h1 className="font-hand text-3xl text-leaf-dark">
          {paso === 1 && t("agregar.chooseCategory")}
          {paso === 2 && t(`category.${categoriaElegida?.categoria}`)}
          {paso === 3 && t("agregar.nameYour", t(`category.${especieElegida?.nombre}`) || especieElegida?.nombre)}
        </h1>
      </div>

      {paso === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => elegirCategoria(cat)}
              disabled={cat.bloqueada}
              className={`sketchy-border p-5 text-left shadow-sketchy-sm transition-transform ${
                cat.bloqueada
                  ? "bg-ink/10 cursor-not-allowed"
                  : "bg-cream-dark hover:-translate-y-0.5"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-hand text-xl">{t(`category.${cat.categoria}`)}</h3>
                {cat.bloqueada && <IconCandado className="w-6 h-6 text-ink/50" />}
              </div>
              <p className="text-xs text-ink/60 mb-1">{t(`duration.${cat.duracion}`)}</p>
              {cat.bloqueada ? (
                <p className="text-xs text-clay">
                  {t("agregar.unlockHint", cat.progreso.total, cat.progreso.hechas, cat.progreso.total)}
                </p>
              ) : (
                <p className="text-xs text-leaf-dark">{t("agregar.available")}</p>
              )}
            </button>
          ))}
        </div>
      )}

      {paso === 2 && categoriaElegida && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categoriaElegida.plantas.map((planta) => {
            const Icono = obtenerIconoPlanta(planta.id);
            return (
              <button
                key={planta.id}
                onClick={() => elegirEspecie(planta)}
                className="sketchy-border bg-cream-dark p-4 flex flex-col items-center gap-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform"
              >
                <Icono className="w-12 h-12 text-leaf-dark" />
                <span className="text-sm text-center">{t(`category.${planta.nombre}`) || planta.nombre}</span>
                {planta.esDemo && (
                  <span className="text-[10px] bg-mustard px-2 py-0.5 rounded-full">{t("agregar.demo")}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {paso === 3 && especieElegida && (
        <form
          onSubmit={manejarSubmit}
          className="sketchy-border bg-cream-dark shadow-sketchy p-6 max-w-lg flex flex-col gap-5"
        >
          <div>
            <label className="font-hand text-lg block mb-1">{t("agregar.nameLabel")}</label>
            <input
              type="text"
              required
              placeholder={t("agregar.namePlaceholder")}
              value={nombrePersonalizado}
              onChange={(e) => setNombrePersonalizado(e.target.value)}
              className="sketchy-border bg-cream w-full px-4 py-2 outline-none focus:shadow-sketchy-sm"
            />
          </div>

          <div>
            <label className="font-hand text-lg block mb-2">{t("agregar.timeLabel")}</label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setModoTiempo("cantidad")}
                className={`sketchy-border px-3 py-1.5 text-sm flex-1 shadow-sketchy-sm ${
                  modoTiempo === "cantidad" ? "bg-leaf text-cream" : "bg-cream"
                }`}
              >
                {t("agregar.modeAmount")}
              </button>
              <button
                type="button"
                onClick={() => setModoTiempo("fecha")}
                className={`sketchy-border px-3 py-1.5 text-sm flex-1 shadow-sketchy-sm ${
                  modoTiempo === "fecha" ? "bg-leaf text-cream" : "bg-cream"
                }`}
              >
                {t("agregar.modeDate")}
              </button>
            </div>

            {modoTiempo === "cantidad" ? (
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  className="sketchy-border bg-cream px-4 py-2 outline-none w-1/2 focus:shadow-sketchy-sm"
                />
                <select
                  value={unidad}
                  onChange={(e) => setUnidad(e.target.value)}
                  className="sketchy-border bg-cream px-4 py-2 outline-none w-1/2 focus:shadow-sketchy-sm"
                >
                  <option value="semanas">{t("agregar.weeks")}</option>
                  <option value="meses">{t("agregar.months")}</option>
                </select>
              </div>
            ) : (
              <div className="w-full relative sketchy-datepicker-container">
                <DatePicker
                  selected={fecha ? new Date(fecha + "T12:00:00") : null}
                  onChange={(date) => {
                    if (date) {
                      const yyyy = date.getFullYear();
                      const mm = String(date.getMonth() + 1).padStart(2, "0");
                      const dd = String(date.getDate()).padStart(2, "0");
                      setFecha(`${yyyy}-${mm}-${dd}`);
                    } else {
                      setFecha("");
                    }
                  }}
                  maxDate={new Date()}
                  locale={idioma === "en" ? enUS : es}
                  dateFormat={idioma === "en" ? "MM/dd/yyyy" : "dd/MM/yyyy"}
                  placeholderText={t("agregar.datePlaceholder")}
                  className="sketchy-border bg-cream px-4 py-2 outline-none w-full focus:shadow-sketchy-sm"
                  wrapperClassName="w-full"
                />
              </div>
            )}
            <p className="text-xs text-ink/60 mt-2">
              {t("agregar.timeHint")}
            </p>
          </div>

          {error && <p className="text-coral text-sm">{error}</p>}

          <button
            type="submit"
            disabled={guardando}
            className="sketchy-border bg-leaf text-cream font-hand text-lg py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform disabled:opacity-60"
          >
            {guardando ? t("agregar.saving") : t("agregar.submit")}
          </button>
        </form>
      )}
    </div>
  );
}
