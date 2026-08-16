import React from "react";

/**
 * Sun icon — sketchy UI style with warm fill colors.
 * Used inside the care timer rings. Self-colored (amber/orange).
 */
export default function IconSol({ className = "w-8 h-8", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <title>Luz solar</title>
      {/* Rays */}
      <path
        d="M24 4 L24 10 M24 38 L24 44 M4 24 L10 24 M38 24 L44 24 M9 9 L14 14 M34 34 L39 39 M9 39 L14 34 M34 14 L39 9"
        stroke="#E8A838"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Sun body */}
      <circle
        cx="24" cy="24" r="10"
        fill="#F5D18E"
        stroke="#E8A838"
        strokeWidth="2.5"
      />
      {/* Inner glow */}
      <circle
        cx="24" cy="24" r="5"
        fill="#E8A838"
        opacity="0.5"
      />
      {/* Highlight */}
      <circle cx="20" cy="20" r="2" fill="#FFFFFF" opacity="0.5" />
    </svg>
  );
}
