import React from "react";

/**
 * Jardinero.jsx
 * -----------------------------------------------------------------------
 * Personaje "Don Tomás" de Pomarium — versión rediseñada para el Dashboard.
 * Ilustración sketchy SVG puro: sombrero amarillo con banda verde, cara
 * redonda y simpática, overol verde y pañuelo. Aislado en este archivo
 * para que el equipo de diseño pueda reemplazarlo sin tocar más código.
 */
export default function Jardinero({ className = "w-32 h-32" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 140"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="60" cy="136" rx="30" ry="4" fill="rgba(46,42,36,0.12)" />

      {/* Hat brim */}
      <ellipse cx="60" cy="38" rx="32" ry="7" fill="#E3B23C" stroke="#2E2A24" strokeWidth="2.5" />
      {/* Hat top */}
      <path
        d="M32 38 Q32 14 60 10 Q88 14 88 38"
        fill="#E3B23C"
        stroke="#2E2A24"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Hat band */}
      <path
        d="M34 34 Q60 28 86 34"
        stroke="#4E7A51"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Head */}
      <circle cx="60" cy="55" r="19" fill="#E3A972" stroke="#2E2A24" strokeWidth="2.5" />

      {/* Eyes */}
      <circle cx="53" cy="53" r="2.2" fill="#2E2A24" />
      <circle cx="67" cy="53" r="2.2" fill="#2E2A24" />
      {/* Eye shine */}
      <circle cx="54" cy="52" r="0.7" fill="#FFF" />
      <circle cx="68" cy="52" r="0.7" fill="#FFF" />

      {/* Eyebrows */}
      <path d="M49 48 Q53 46 56 48" stroke="#2E2A24" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M64 48 Q67 46 71 48" stroke="#2E2A24" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Nose */}
      <path d="M60 56 Q61 59 60 60" stroke="#2E2A24" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Smile */}
      <path d="M52 63 Q60 69 68 63" stroke="#2E2A24" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Cheeks */}
      <circle cx="47" cy="60" r="3.5" fill="#E86F5C" opacity="0.3" />
      <circle cx="73" cy="60" r="3.5" fill="#E86F5C" opacity="0.3" />

      {/* Neck */}
      <rect x="55" y="72" width="10" height="6" fill="#E3A972" />

      {/* Body / overalls */}
      <path
        d="M34 78 Q60 72 86 78 L90 130 L30 130 Z"
        fill="#4E7A51"
        stroke="#2E2A24"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Overalls straps */}
      <path d="M48 78 L48 95" stroke="#33532F" strokeWidth="3" strokeLinecap="round" />
      <path d="M72 78 L72 95" stroke="#33532F" strokeWidth="3" strokeLinecap="round" />

      {/* Pocket */}
      <rect x="50" y="100" width="20" height="14" rx="3" fill="#33532F" stroke="#2E2A24" strokeWidth="2" />
      {/* Pocket flower */}
      <circle cx="60" cy="100" r="3" fill="#E86F5C" />
      <circle cx="60" cy="100" r="1.5" fill="#E3B23C" />

      {/* Arms */}
      <path d="M34 82 Q20 90 18 105" stroke="#2E2A24" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M86 82 Q100 90 102 105" stroke="#2E2A24" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Hands */}
      <circle cx="18" cy="106" r="4" fill="#E3A972" stroke="#2E2A24" strokeWidth="2" />
      <circle cx="102" cy="106" r="4" fill="#E3A972" stroke="#2E2A24" strokeWidth="2" />

      {/* Feet */}
      <ellipse cx="45" cy="132" rx="10" ry="5" fill="#8B6F47" stroke="#2E2A24" strokeWidth="2" />
      <ellipse cx="75" cy="132" rx="10" ry="5" fill="#8B6F47" stroke="#2E2A24" strokeWidth="2" />
    </svg>
  );
}
