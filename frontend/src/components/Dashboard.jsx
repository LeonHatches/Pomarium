import React from "react";
import { useNavigate } from "react-router-dom";
import { ETAPAS } from "../data/catalogoPlantas";
import { obtenerIconoPlanta } from "../assets/plants";
import { Jardinero } from "../assets/character";
import { IconCandado, IconGota, IconSol, IconNutriente, IconCamara } from "../assets/icons";

// Cuidados sugeridos por etapa — ajusta según la especie real en producción.
const CUIDADOS_POR_ETAPA = {
  Brote: { agua: "Diaria, en spray", luz: "Indirecta, 4h/día", nutrientes: "Ninguno aún" },
  "Etapa Vegetativa": { agua: "Cada 2-3 días", luz: "Indirecta, 6h/día", nutrientes: "Abono suave quincenal" },
  Floración: { agua: "Cada 3-4 días", luz: "Directa parcial, 6h/día", nutrientes: "Abono rico en fósforo" },
  Madurez: { agua: "Semanal", luz: "Directa, 6-8h/día", nutrientes: "Abono de mantenimiento mensual" },
};

const CONSEJOS_POR_ETAPA = {
  Brote: "¡Tu planta apenas despierta! Mantén la tierra húmeda pero sin encharcar.",
  "Etapa Vegetativa": "Está creciendo fuerte. Revisa que reciba suficiente luz indirecta.",
  Floración: "¡Se acercan las flores! No muevas la maceta de lugar en esta etapa.",
  Madurez: "Tu planta llegó lejos. Ahora toca mantenerla feliz a largo plazo.",
};

/**
 * Tarjeta de una etapa del árbol de evolución (requerimiento 8):
 * - bloqueada -> candado.
 * - desbloqueada sin foto -> ícono genérico de la especie.
 * - desbloqueada con foto validada -> la foto del usuario reemplaza el ícono.
 */
function TarjetaEtapa({ nombre, info, esActual, IconoEspecie }) {
  const desbloqueada = !!info?.desbloqueada;
  return (
    <div
      className={`sketchy-border p-3 flex flex-col items-center gap-2 shadow-sketchy-sm transition-all ${
        desbloqueada ? "bg-cream-dark" : "bg-ink/10 grayscale"
      } ${esActual ? "ring-2 ring-mustard" : ""}`}
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden bg-leaf-light/30">
        {!desbloqueada && <IconCandado className="w-8 h-8 text-ink/50" />}
        {desbloqueada && info?.fotoURL && (
          <img src={info.fotoURL} alt={`${nombre} validada`} className="w-full h-full object-cover" />
        )}
        {desbloqueada && !info?.fotoURL && <IconoEspecie className="w-9 h-9 text-leaf-dark" />}
      </div>
      <span className="text-sm font-hand text-center">{nombre}</span>
    </div>
  );
}

function TarjetaCuidado({ Icono, titulo, valor }) {
  return (
    <div className="sketchy-border bg-cream-dark p-3 flex items-center gap-3 shadow-sketchy-sm">
      <Icono className="w-7 h-7 text-leaf-dark shrink-0" />
      <div>
        <p className="text-xs text-ink/60">{titulo}</p>
        <p className="text-sm font-semibold">{valor}</p>
      </div>
    </div>
  );
}

/**
 * Dashboard.jsx
 * Vista de una planta: árbol de evolución (4 etapas), tarjetas de cuidado
 * dinámicas y el "Consejo del jardinero" en un globo de diálogo estilo
 * cómic/sketchy junto al personaje jardinero (requerimiento 7).
 */
export default function Dashboard({ planta, onAbrirValidacion }) {
  const navigate = useNavigate();
  if (!planta) return null;

  const etapaActual = planta.etapaActual || "Brote";
  const cuidados = CUIDADOS_POR_ETAPA[etapaActual];
  const consejo = CONSEJOS_POR_ETAPA[etapaActual];
  const IconoEspecie = obtenerIconoPlanta(planta.especieId);
  const yaCompleta = etapaActual === ETAPAS[ETAPAS.length - 1];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <button
            onClick={() => navigate("/mis-plantas")}
            className="text-sm text-ink/60 underline underline-offset-2 mb-1"
          >
            ← Mis Plantas
          </button>
          <h1 className="font-hand text-3xl text-leaf-dark">{planta.nombrePersonalizado}</h1>
          <p className="text-ink/60 text-sm">
            {planta.especieNombre} · {planta.categoria}
          </p>
        </div>
      </div>

      {/* Árbol de evolución */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {ETAPAS.map((etapa) => (
          <TarjetaEtapa
            key={etapa}
            nombre={etapa}
            info={planta.etapas?.[etapa]}
            esActual={etapa === etapaActual}
            IconoEspecie={IconoEspecie}
          />
        ))}
      </div>

      {!yaCompleta && (
        <button
          onClick={onAbrirValidacion}
          className="sketchy-border self-start bg-leaf text-cream font-hand text-lg px-5 py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform flex items-center gap-2"
        >
          <IconCamara className="w-6 h-6" /> Subir foto y avanzar de etapa
        </button>
      )}
      {yaCompleta && (
        <p className="sketchy-border self-start bg-mustard/40 px-4 py-2 text-sm font-hand text-lg">
          🏆 ¡Esta planta llegó a Madurez!
        </p>
      )}

      {/* Cuidados dinámicos según la etapa */}
      <div>
        <h2 className="font-hand text-xl mb-3">Cuidados de hoy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <TarjetaCuidado Icono={IconGota} titulo="Agua" valor={cuidados.agua} />
          <TarjetaCuidado Icono={IconSol} titulo="Luz solar" valor={cuidados.luz} />
          <TarjetaCuidado Icono={IconNutriente} titulo="Nutrientes" valor={cuidados.nutrientes} />
        </div>
      </div>

      {/* Consejo del jardinero: globo de diálogo cómic/sketchy + personaje SVG */}
      <div className="flex items-end gap-3 mt-2">
        <div className="relative sketchy-border bg-cream-dark p-4 shadow-sketchy-sm max-w-md">
          <p className="font-hand text-lg text-ink/90">"{consejo}"</p>
          <div
            className="absolute -right-3 bottom-4 w-0 h-0"
            style={{
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: "14px solid #EDE2C9",
            }}
          />
        </div>

        {/* Personaje jardinero — ver src/assets/character/Jardinero.jsx */}
        <Jardinero className="w-24 h-24 flex-shrink-0" />
      </div>
    </div>
  );
}
