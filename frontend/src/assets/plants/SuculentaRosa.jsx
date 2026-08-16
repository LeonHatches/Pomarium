import React from "react";

/**
 * Suculenta Rosa (Echeveria) — Sketchy UI illustration.
 * A rosette succulent in a terracotta pot with hand-drawn style.
 */
export default function SuculentaRosa({ className = "w-24 h-24" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 140"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pot rim */}
      <path d="M32 95 L88 95 L86 100 L34 100 Z" fill="#C97B4A" stroke="#2E2A24" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Pot body */}
      <path d="M36 100 L42 128 L78 128 L84 100 Z" fill="#C97B4A" stroke="#2E2A24" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M38 105 L82 105" stroke="#E3A972" strokeWidth="2" strokeLinecap="round" />

      {/* Soil */}
      <ellipse cx="60" cy="96" rx="26" ry="4" fill="#8B6F47" stroke="#2E2A24" strokeWidth="1.5" />

      {/* Outer leaves */}
      <path d="M60 92 C40 88 22 78 20 60 C22 64 36 72 60 75" fill="#7FA679" stroke="#2E2A24" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 92 C80 88 98 78 100 60 C98 64 84 72 60 75" fill="#7FA679" stroke="#2E2A24" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 92 C45 86 30 68 35 50 C38 56 46 68 60 75" fill="#4E7A51" stroke="#2E2A24" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 92 C75 86 90 68 85 50 C82 56 74 68 60 75" fill="#4E7A51" stroke="#2E2A24" strokeWidth="2" strokeLinejoin="round" />

      {/* Middle leaves */}
      <path d="M60 85 C48 78 38 58 45 42 C48 50 52 64 60 72" fill="#7FA679" stroke="#2E2A24" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M60 85 C72 78 82 58 75 42 C72 50 68 64 60 72" fill="#7FA679" stroke="#2E2A24" strokeWidth="1.8" strokeLinejoin="round" />

      {/* Center leaves */}
      <path d="M60 78 C54 70 50 52 55 38 C57 46 58 60 60 68" fill="#33532F" stroke="#2E2A24" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M60 78 C66 70 70 52 65 38 C63 46 62 60 60 68" fill="#33532F" stroke="#2E2A24" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Center rosette */}
      <circle cx="60" cy="65" r="5" fill="#E86F5C" stroke="#2E2A24" strokeWidth="1.5" />
      <circle cx="60" cy="65" r="2" fill="#E3A972" />

      {/* Soil dots */}
      <circle cx="48" cy="95" r="1" fill="#6B5535" />
      <circle cx="60" cy="97" r="1.2" fill="#6B5535" />
      <circle cx="72" cy="95" r="1" fill="#6B5535" />
    </svg>
  );
}
