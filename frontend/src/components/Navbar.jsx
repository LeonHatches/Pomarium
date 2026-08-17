import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";
import {
  IconMisPlantas,
  IconAgregarPlanta,
  IconUsuario,
  IconSalir,
  IconMenu,
  IconCerrar,
  IconIdioma,
} from "../assets/icons";

/**
 * Navbar.jsx
 * -----------------------------------------------------------------------
 * Barra de navegación superior fija (requerimiento 3). Siempre visible
 * mientras hay sesión iniciada, con: logo, "Mis Plantas", "Añadir planta",
 * perfil del usuario y "Cerrar sesión" — el usuario nunca queda atrapado
 * en una sola vista. 100% responsive: en pantallas angostas colapsa a un
 * menú desplegable.
 */
export default function Navbar({ usuario, onCerrarSesion }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  const { t, idioma, setIdioma } = useI18n();

  const cerrarYNavegar = (ruta) => {
    setMenuAbierto(false);
    navigate(ruta);
  };

  const manejarCerrarSesion = async () => {
    setMenuAbierto(false);
    await onCerrarSesion();
    navigate("/");
  };

  const toggleIdioma = () => {
    setIdioma(idioma === "es" ? "en" : "es");
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm">
      <div className="sketchy-border bg-cream-dark mx-4 mt-4 px-4 sm:px-5 py-3 flex items-center justify-between shadow-sketchy-sm">
        <Link to="/mis-plantas" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🌱</span>
          <span className="text-xl sm:text-2xl font-hand text-leaf-dark">Pomarium</span>
        </Link>

        {usuario && (
          <>
            {/* Navegación en escritorio */}
            <nav className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleIdioma}
                className="sketchy-border px-3 py-1.5 text-sm font-hand text-lg bg-cream flex items-center gap-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform"
                aria-label="Cambiar idioma"
              >
                <IconIdioma className="w-5 h-5" /> {t("lang.label")}
              </button>
              <button
                onClick={() => cerrarYNavegar("/mis-plantas")}
                className="sketchy-border px-3 py-1.5 text-sm font-hand text-lg bg-cream flex items-center gap-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform"
              >
                <IconMisPlantas className="w-5 h-5" /> {t("nav.myPlants")}
              </button>
              <button
                onClick={() => cerrarYNavegar("/agregar")}
                className="sketchy-border px-3 py-1.5 text-sm font-hand text-lg bg-leaf text-cream flex items-center gap-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform"
              >
                <IconAgregarPlanta className="w-5 h-5" /> {t("nav.addPlant")}
              </button>
              <div className="sketchy-border px-3 py-1.5 text-sm bg-cream flex items-center gap-2 shadow-sketchy-sm">
                <IconUsuario className="w-5 h-5" />
                <span className="max-w-[140px] truncate">
                  {usuario.displayName || usuario.email}
                </span>
              </div>
              <button
                onClick={manejarCerrarSesion}
                className="sketchy-border px-3 py-1.5 text-sm font-hand text-lg bg-clay text-cream flex items-center gap-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform"
              >
                <IconSalir className="w-5 h-5" /> {t("nav.logout")}
              </button>
            </nav>

            {/* Botón menú móvil */}
            <button
              className="md:hidden sketchy-border w-10 h-10 flex items-center justify-center bg-cream shadow-sketchy-sm"
              onClick={() => setMenuAbierto((v) => !v)}
              aria-label={t("nav.openMenu")}
            >
              {menuAbierto ? <IconCerrar className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
            </button>
          </>
        )}
      </div>

      {/* Menú desplegable móvil */}
      {usuario && menuAbierto && (
        <div className="md:hidden sketchy-border bg-cream-dark mx-4 mt-2 p-3 flex flex-col gap-2 shadow-sketchy-sm">
          <div className="flex items-center gap-2 px-2 py-1 text-sm text-ink/70">
            <IconUsuario className="w-5 h-5" />
            <span className="truncate">{usuario.displayName || usuario.email}</span>
          </div>
          <button
            onClick={toggleIdioma}
            className="sketchy-border px-3 py-2 text-sm font-hand text-lg bg-cream flex items-center gap-2 shadow-sketchy-sm"
          >
            <IconIdioma className="w-5 h-5" /> {t("lang.label")}
          </button>
          <button
            onClick={() => cerrarYNavegar("/mis-plantas")}
            className="sketchy-border px-3 py-2 text-sm font-hand text-lg bg-cream flex items-center gap-2 shadow-sketchy-sm"
          >
            <IconMisPlantas className="w-5 h-5" /> {t("nav.myPlants")}
          </button>
          <button
            onClick={() => cerrarYNavegar("/agregar")}
            className="sketchy-border px-3 py-2 text-sm font-hand text-lg bg-leaf text-cream flex items-center gap-2 shadow-sketchy-sm"
          >
            <IconAgregarPlanta className="w-5 h-5" /> {t("nav.addPlant")}
          </button>
          <button
            onClick={manejarCerrarSesion}
            className="sketchy-border px-3 py-2 text-sm font-hand text-lg bg-clay text-cream flex items-center gap-2 shadow-sketchy-sm"
          >
            <IconSalir className="w-5 h-5" /> {t("nav.logout")}
          </button>
        </div>
      )}
    </header>
  );
}
