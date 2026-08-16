import React from "react";
import Navbar from "./Navbar";

/**
 * Layout.jsx
 * -----------------------------------------------------------------------
 * Estructura base de Pomarium: navbar fija arriba (Navbar.jsx) + contenido
 * + footer simple, siempre anclado al fondo (min-h-screen + flex-col).
 *
 * Requerimiento 9: el footer NO incluye enlaces a redes sociales
 * (Instagram, TikTok, etc.) — solo una firma breve.
 */
export default function Layout({ children, usuario, onCerrarSesion }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink font-body">
      <Navbar usuario={usuario} onCerrarSesion={onCerrarSesion} />

      <main className="flex-1 px-4 py-6 max-w-5xl w-full mx-auto">
        {children}
      </main>

      <footer className="sketchy-border bg-cream-dark mx-4 mb-4 px-5 py-4 text-sm text-ink/80 shadow-sketchy-sm">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <p className="font-hand text-base">Pomarium — cultiva a tu ritmo 🌿</p>
          <span className="hidden sm:inline text-ink/40">·</span>
          <p className="text-xs text-ink/60">
            Hecho con cariño para quienes cuidan sus plantas paso a paso.
          </p>
        </div>
      </footer>
    </div>
  );
}
