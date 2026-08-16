import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./components/Auth";
import MisPlantas from "./components/MisPlantas";
import AgregarPlanta from "./components/AgregarPlanta";
import Dashboard from "./components/Dashboard";
import ModalDesbloqueo from "./components/ModalDesbloqueo";
import {
  observarSesion,
  cerrarSesion,
  crearPlantaUsuario,
  obtenerPlantasUsuario,
  desbloquearEtapaPlanta,
  actualizarPlantaUsuario,
} from "./firebase";

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);
  const [plantas, setPlantas] = useState(null); // null = sin cargar aún
  const [validacionAbierta, setValidacionAbierta] = useState(null); // plantaId | null

  // Sesión + carga inicial de TODAS las plantas del usuario desde Firebase
  // (requerimiento 6): al recargar la página o volver a iniciar sesión,
  // nada se pierde.
  useEffect(() => {
    const unsub = observarSesion(async (user) => {
      setUsuario(user);
      setCargandoAuth(false);
      if (user) {
        try {
          const propias = await obtenerPlantasUsuario(user.uid);
          setPlantas(propias);
        } catch (err) {
          console.error("No se pudieron cargar las plantas del usuario:", err);
          setPlantas([]);
        }
      } else {
        setPlantas(null);
      }
    });
    return unsub;
  }, []);

  const manejarCrearPlanta = async (nuevaPlanta) => {
    await crearPlantaUsuario(usuario.uid, nuevaPlanta);
    setPlantas((prev) => [...(prev || []), nuevaPlanta]);
  };

  const manejarDesbloqueo = async (plantaId, etapaDesbloqueada, fotoURL) => {
    const planta = plantas.find((p) => p.id === plantaId);
    if (!planta) return;
    const etapas = await desbloquearEtapaPlanta(
      usuario.uid,
      plantaId,
      etapaDesbloqueada,
      fotoURL,
      planta.etapas
    );
    setPlantas((prev) =>
      prev.map((p) =>
        p.id === plantaId ? { ...p, etapaActual: etapaDesbloqueada, etapas } : p
      )
    );
    setValidacionAbierta(null);
  };

  const manejarCuidado = async (plantaId, tipoCuidado) => {
    const ahora = new Date().toISOString();
    const planta = plantas.find((p) => p.id === plantaId);
    if (!planta) return;

    const cuidadosActuales = planta.historialCuidados || {};
    const nuevosCuidados = { ...cuidadosActuales, [tipoCuidado]: ahora };

    setPlantas((prev) =>
      prev.map((p) =>
        p.id === plantaId ? { ...p, historialCuidados: nuevosCuidados } : p
      )
    );

    await actualizarPlantaUsuario(usuario.uid, plantaId, {
      historialCuidados: nuevosCuidados,
    });
  };

  if (cargandoAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="font-hand text-2xl text-leaf-dark">Cargando Pomarium...</p>
      </div>
    );
  }

  return (
    <Layout usuario={usuario} onCerrarSesion={cerrarSesion}>
      {!usuario ? (
        <Auth />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/mis-plantas" replace />} />
            <Route path="/mis-plantas" element={<MisPlantas plantas={plantas} />} />
            <Route
              path="/agregar"
              element={<AgregarPlanta plantasUsuario={plantas || []} onCrearPlanta={manejarCrearPlanta} />}
            />
            <Route
              path="/planta/:id"
              element={
                <VistaPlanta
                  plantas={plantas}
                  onAbrirValidacion={setValidacionAbierta}
                  onRegistrarCuidado={manejarCuidado}
                />
              }
            />
            <Route path="*" element={<Navigate to="/mis-plantas" replace />} />
          </Routes>

          {validacionAbierta && plantas && (
            <ModalDesbloqueo
              abierto={!!validacionAbierta}
              onCerrar={() => setValidacionAbierta(null)}
              uid={usuario.uid}
              planta={plantas.find((p) => p.id === validacionAbierta)}
              onDesbloqueado={(etapa, fotoURL) => manejarDesbloqueo(validacionAbierta, etapa, fotoURL)}
            />
          )}
        </>
      )}
    </Layout>
  );
}

/** Sub-vista que resuelve la planta actual a partir del parámetro de ruta. */
function VistaPlanta({ plantas, onAbrirValidacion, onRegistrarCuidado }) {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!plantas) {
    return <p className="text-center text-ink/60 mt-10">Cargando...</p>;
  }

  const planta = plantas.find((p) => p.id === id);
  if (!planta) {
    return (
      <div className="text-center mt-10">
        <p className="text-ink/60 mb-4">No encontramos esa planta.</p>
        <button
          onClick={() => navigate("/mis-plantas")}
          className="sketchy-border bg-leaf text-cream font-hand text-lg px-4 py-2 shadow-sketchy-sm"
        >
          Volver a Mis Plantas
        </button>
      </div>
    );
  }

  return (
    <Dashboard
      planta={planta}
      onAbrirValidacion={() => onAbrirValidacion(planta.id)}
      onRegistrarCuidado={(tipo) => onRegistrarCuidado(planta.id, tipo)}
    />
  );
}
