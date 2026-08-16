import React from "react";

/**
 * Aloe Vera — Sketchy UI illustration.
 * An aloe plant in a terracotta pot with hand-drawn spiky leaves.
 */
export default function AloeVera({ className = "w-24 h-24" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 140"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pot rim */}
      <path d="M30 98 L90 98 L88 103 L32 103 Z" fill="#C97B4A" stroke="#2E2A24" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Pot body */}
      <path d="M34 103 L40 132 L80 132 L86 103 Z" fill="#C97B4A" stroke="#2E2A24" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M36 108 L84 108" stroke="#E3A972" strokeWidth="2" strokeLinecap="round" />

      {/* Soil */}
      <ellipse cx="60" cy="99" rx="28" ry="4" fill="#8B6F47" stroke="#2E2A24" strokeWidth="1.5" />

      {/* Back leaves */}
      <path d="M60 96 L42 30 Q38 18 44 14 Q48 18 46 28 L55 80" fill="#7FA679" stroke="#2E2A24" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 96 L78 30 Q82 18 76 14 Q72 18 74 28 L65 80" fill="#7FA679" stroke="#2E2A24" strokeWidth="2" strokeLinejoin="round" />

      {/* Middle leaves */}
      <path d="M60 96 L34 44 Q30 32 36 26 Q40 30 38 40 L54 84" fill="#4E7A51" stroke="#2E2A24" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 96 L86 44 Q90 32 84 26 Q80 30 82 40 L66 84" fill="#4E7A51" stroke="#2E2A24" strokeWidth="2" strokeLinejoin="round" />

      {/* Center leaf */}
      <path d="M60 96 L56 24 Q55 12 60 8 Q65 12 64 24 Z" fill="#33532F" stroke="#2E2A24" strokeWidth="2" strokeLinejoin="round" />

      {/* Leaf spines */}
      <line x1="44" y1="40" x2="40" y2="36" stroke="#2E2A24" strokeWidth="1" strokeLinecap="round" />
      <line x1="46" y1="55" x2="42" y2="52" stroke="#2E2A24" strokeWidth="1" strokeLinecap="round" />
      <line x1="76" y1="40" x2="80" y2="36" stroke="#2E2A24" strokeWidth="1" strokeLinecap="round" />
      <line x1="74" y1="55" x2="78" y2="52" stroke="#2E2A24" strokeWidth="1" strokeLinecap="round" />
      <line x1="58" y1="30" x2="54" y2="28" stroke="#2E2A24" strokeWidth="1" strokeLinecap="round" />
      <line x1="62" y1="30" x2="66" y2="28" stroke="#2E2A24" strokeWidth="1" strokeLinecap="round" />

      {/* Leaf texture lines */}
      <path d="M58 70 L56 40" stroke="#33532F" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M62 70 L64 40" stroke="#33532F" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Soil dots */}
      <circle cx="48" cy="98" r="1" fill="#6B5535" />
      <circle cx="60" cy="100" r="1.2" fill="#6B5535" />
      <circle cx="72" cy="98" r="1" fill="#6B5535" />
    </svg>
  );
}
