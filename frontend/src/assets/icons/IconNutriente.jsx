import React from "react";

/**
 * Nutrient / soil icon — sketchy UI style with earthy fill colors.
 * Used inside the care timer rings. Self-colored (brown/earth tones).
 */
export default function IconNutriente({ className = "w-8 h-8", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <title>Nutrientes</title>
      {/* Soil mound */}
      <path
        d="M8 36 C8 36 14 20 24 20 C34 20 40 36 40 36"
        fill="#C4A882"
        stroke="#2E2A24"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Soil base */}
      <path
        d="M6 36 L42 36"
        stroke="#2E2A24"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Soil texture */}
      <circle cx="18" cy="30" r="1.5" fill="#8B6F47" />
      <circle cx="28" cy="28" r="1.8" fill="#8B6F47" />
      <circle cx="23" cy="33" r="1.2" fill="#8B6F47" />
      <circle cx="32" cy="32" r="1.4" fill="#8B6F47" />
      {/* Sprout */}
      <path
        d="M24 20 C24 14 20 10 16 8 C20 10 22 14 22 18"
        fill="#7FA679"
        stroke="#2E2A24"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 20 C24 14 28 10 32 8 C28 10 26 14 26 18"
        fill="#7FA679"
        stroke="#2E2A24"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
