import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { catalogoConEstadoDesbloqueo } from "../utils/desbloqueo";
import { resolverInicioPlanta } from "../utils/etapas";
import { obtenerIconoPlanta } from "../assets/plants";
import { IconCandado } from "../assets/icons";

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
    setError("");

    if (!nombrePersonalizado.trim()) {
      setError("Ponle un nombre a tu planta para continuar.");
      return;
    }
    if (modoTiempo === "cantidad" && (cantidad === "" || Number(cantidad) < 0)) {
      setError("Indica cuánto tiempo tiene tu planta.");
      return;
    }
    if (modoTiempo === "fecha" && !fecha) {
      setError("Elige la fecha en que empezó tu planta.");
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
        Brote: { desbloqueada: true, fotoURL: null, fechaDesbloqueo: null },
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
      setError("No se pudo guardar la planta. Intenta de nuevo.");
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
          {paso === 1 && "Elige una categoría"}
          {paso === 2 && categoriaElegida?.categoria}
          {paso === 3 && `¿Cómo se llama tu ${especieElegida?.nombre}?`}
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
                <h3 className="font-hand text-xl">{cat.categoria}</h3>
                {cat.bloqueada && <IconCandado className="w-6 h-6 text-ink/50" />}
              </div>
              <p className="text-xs text-ink/60 mb-1">{cat.duracion}</p>
              {cat.bloqueada ? (
                <p className="text-xs text-clay">
                  Completa las {cat.progreso.total} Plantas Decorativas para
                  desbloquear ({cat.progreso.hechas}/{cat.progreso.total})
                </p>
              ) : (
                <p className="text-xs text-leaf-dark">Disponible</p>
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
                <span className="text-sm text-center">{planta.nombre}</span>
                {planta.esDemo && (
                  <span className="text-[10px] bg-mustard px-2 py-0.5 rounded-full">Demo</span>
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
            <label className="font-hand text-lg block mb-1">Nombre de tu planta *</label>
            <input
              type="text"
              required
              placeholder='Ej. "Pica-Pica", "Frida"...'
              value={nombrePersonalizado}
              onChange={(e) => setNombrePersonalizado(e.target.value)}
              className="sketchy-border bg-cream w-full px-4 py-2 outline-none focus:shadow-sketchy-sm"
            />
          </div>

          <div>
            <label className="font-hand text-lg block mb-2">¿Cuánto tiempo tiene? *</label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setModoTiempo("cantidad")}
                className={`sketchy-border px-3 py-1.5 text-sm flex-1 shadow-sketchy-sm ${
                  modoTiempo === "cantidad" ? "bg-leaf text-cream" : "bg-cream"
                }`}
              >
                Semanas / meses
              </button>
              <button
                type="button"
                onClick={() => setModoTiempo("fecha")}
                className={`sketchy-border px-3 py-1.5 text-sm flex-1 shadow-sketchy-sm ${
                  modoTiempo === "fecha" ? "bg-leaf text-cream" : "bg-cream"
                }`}
              >
                Fecha de inicio
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
                  <option value="semanas">Semanas</option>
                  <option value="meses">Meses</option>
                </select>
              </div>
            ) : (
              <input
                type="date"
                value={fecha}
                max={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setFecha(e.target.value)}
                className="sketchy-border bg-cream px-4 py-2 outline-none w-full focus:shadow-sketchy-sm"
              />
            )}
            <p className="text-xs text-ink/60 mt-2">
              Según el tiempo que indiques, tu planta arrancará automáticamente
              en la etapa correcta de su ciclo de vida (no siempre en "Brote").
            </p>
          </div>

          {error && <p className="text-coral text-sm">{error}</p>}

          <button
            type="submit"
            disabled={guardando}
            className="sketchy-border bg-leaf text-cream font-hand text-lg py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform disabled:opacity-60"
          >
            {guardando ? "Guardando..." : "Registrar planta 🌱"}
          </button>
        </form>
      )}
    </div>
  );
}
