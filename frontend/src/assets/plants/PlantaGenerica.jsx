import React from "react";

/**
 * PlantaGenerica — Sketchy UI fallback illustration.
 * A simple potted seedling for any species without its own illustration.
 */
export default function PlantaGenerica({ className = "w-24 h-24" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 140"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pot rim */}
      <path d="M35 95 L85 95 L83 100 L37 100 Z" fill="#C97B4A" stroke="#2E2A24" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Pot body */}
      <path d="M39 100 L44 126 L76 126 L81 100 Z" fill="#C97B4A" stroke="#2E2A24" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Soil */}
      <ellipse cx="60" cy="96" rx="22" ry="3" fill="#8B6F47" stroke="#2E2A24" strokeWidth="1.5" />

      {/* Stem */}
      <path d="M60 92 C60 80 58 60 60 45" stroke="#4E7A51" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Leaves */}
      <path d="M60 65 C50 55 38 50 35 40 C42 44 52 52 58 62" fill="#7FA679" stroke="#2E2A24" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M60 55 C70 45 82 40 85 30 C78 34 68 42 62 52" fill="#7FA679" stroke="#2E2A24" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M60 45 C55 35 48 28 45 18 C50 22 56 32 59 42" fill="#4E7A51" stroke="#2E2A24" strokeWidth="1.8" strokeLinejoin="round" />

      {/* Soil dots */}
      <circle cx="50" cy="95" r="1" fill="#6B5535" />
      <circle cx="60" cy="97" r="1" fill="#6B5535" />
      <circle cx="70" cy="95" r="1" fill="#6B5535" />
    </svg>
  );
}
