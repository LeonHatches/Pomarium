import React from "react";

/**
 * Jardinero.jsx
 * -----------------------------------------------------------------------
 * Personaje "jardinero" de Pomarium, usado junto al globo de diálogo del
 * Consejo del Jardinero (ver Dashboard.jsx). Este es un placeholder
 * dibujado a mano en SVG puro (sin dependencias) para que la app funcione
 * "out of the box". Está aislado en este único archivo a propósito:
 * tu compañero de diseño puede reemplazar TODO el contenido del <svg>
 * de abajo por la ilustración exportada de Figma sin tener que tocar
 * Dashboard.jsx ni ningún otro componente — solo debe conservar el
 * nombre del archivo y la exportación por defecto.
 */
export default function Jardinero({ className = "w-24 h-24" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sombrero */}
      <path
        d="M20 34 Q48 14 76 34 L70 34 Q48 22 26 34 Z"
        fill="#E3B23C"
        stroke="#2E2A24"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <ellipse cx="48" cy="35" rx="24" ry="5" fill="#E3B23C" stroke="#2E2A24" strokeWidth="2" />

      {/* Cabeza */}
      <circle cx="48" cy="46" r="14" fill="#E3A972" stroke="#2E2A24" strokeWidth="2" />
      <circle cx="43" cy="46" r="1.6" fill="#2E2A24" />
      <circle cx="53" cy="46" r="1.6" fill="#2E2A24" />
      <path d="M43 52 Q48 55 53 52" stroke="#2E2A24" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Cuerpo / overol */}
      <path
        d="M32 60 Q48 54 64 60 L68 88 L28 88 Z"
        fill="#4E7A51"
        stroke="#2E2A24"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="40" y="60" width="16" height="14" rx="2" fill="#33532F" stroke="#2E2A24" strokeWidth="2" />

      {/* Brazo con regadera */}
      <path d="M64 66 Q76 70 78 60" stroke="#2E2A24" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path
        d="M76 50 h10 l6 4 h6 v4 h-6 l-2 3 h-14 z"
        fill="#C97B4A"
        stroke="#2E2A24"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M83 54 L83 46" stroke="#2E2A24" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M79 40 q2 -4 6 0" stroke="#7FA679" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
