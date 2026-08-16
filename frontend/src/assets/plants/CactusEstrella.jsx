import React from "react";

/**
 * Cactus Estrella (Astrophytum) — Sketchy UI illustration.
 * A cactus in a terracotta pot with hand-drawn style, matching the mockup.
 * Does NOT use IconBase because this is a full illustration, not an icon.
 */
export default function CactusEstrella({ className = "w-24 h-24" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 140"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Pot ── */}
      {/* Pot rim */}
      <path
        d="M30 95 L90 95 L88 100 L32 100 Z"
        fill="#C97B4A"
        stroke="#2E2A24"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Pot body */}
      <path
        d="M34 100 L40 130 L80 130 L86 100 Z"
        fill="#C97B4A"
        stroke="#2E2A24"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Pot detail line */}
      <path d="M36 105 L84 105" stroke="#E3A972" strokeWidth="2" strokeLinecap="round" />

      {/* ── Soil ── */}
      <ellipse cx="60" cy="96" rx="28" ry="4" fill="#8B6F47" stroke="#2E2A24" strokeWidth="1.5" />

      {/* ── Cactus body (main) ── */}
      <path
        d="M48 94 C46 70 44 50 48 35 C52 22 58 18 60 16 C62 18 68 22 72 35 C76 50 74 70 72 94"
        fill="#4E7A51"
        stroke="#2E2A24"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Cactus ribs */}
      <path d="M54 25 C54 50 53 75 54 92" stroke="#33532F" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M60 18 C60 45 60 70 60 92" stroke="#33532F" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M66 25 C66 50 67 75 66 92" stroke="#33532F" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* ── Left arm ── */}
      <path
        d="M48 60 C38 58 30 52 28 42 C26 36 30 30 36 32 C40 34 40 40 38 46 C36 50 42 55 48 56"
        fill="#4E7A51"
        stroke="#2E2A24"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Left arm rib */}
      <path d="M36 35 C38 42 40 50 46 56" stroke="#33532F" strokeWidth="1" fill="none" />

      {/* ── Right arm ── */}
      <path
        d="M72 50 C80 48 86 44 90 38 C92 34 90 28 84 28 C80 28 78 34 80 40 C82 44 78 48 72 48"
        fill="#4E7A51"
        stroke="#2E2A24"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Right arm rib */}
      <path d="M86 30 C84 36 80 44 74 48" stroke="#33532F" strokeWidth="1" fill="none" />

      {/* ── Spines ── */}
      <line x1="60" y1="16" x2="60" y2="10" stroke="#2E2A24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="56" y1="18" x2="52" y2="12" stroke="#2E2A24" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="64" y1="18" x2="68" y2="12" stroke="#2E2A24" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="50" y1="40" x2="44" y2="36" stroke="#2E2A24" strokeWidth="1" strokeLinecap="round" />
      <line x1="70" y1="38" x2="76" y2="34" stroke="#2E2A24" strokeWidth="1" strokeLinecap="round" />
      <line x1="50" y1="60" x2="44" y2="58" stroke="#2E2A24" strokeWidth="1" strokeLinecap="round" />
      <line x1="70" y1="58" x2="76" y2="56" stroke="#2E2A24" strokeWidth="1" strokeLinecap="round" />

      {/* ── Tiny flower on top ── */}
      <circle cx="60" cy="10" r="3" fill="#E86F5C" stroke="#2E2A24" strokeWidth="1" />
      <circle cx="60" cy="10" r="1.2" fill="#E3B23C" />

      {/* ── Decorative soil dots ── */}
      <circle cx="45" cy="95" r="1.2" fill="#6B5535" />
      <circle cx="55" cy="97" r="1" fill="#6B5535" />
      <circle cx="65" cy="96" r="1.2" fill="#6B5535" />
      <circle cx="75" cy="95" r="1" fill="#6B5535" />
    </svg>
  );
}
