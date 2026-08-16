import React from "react";

/**
 * Water droplet icon — sketchy UI style with fill colors.
 * Used inside the care timer rings. Renders at native color (blue)
 * rather than inheriting currentColor, for visual richness.
 */
export default function IconGota({ className = "w-8 h-8", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <title>Agua</title>
      {/* Drop body */}
      <path
        d="M24 6 C32 18 38 24 38 31 C38 39 31 43 24 43 C17 43 10 39 10 31 C10 24 16 18 24 6 Z"
        fill="#A8CCF0"
        stroke="#2E2A24"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Highlight */}
      <path
        d="M18 28 C18 22 22 16 24 12"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Inner shadow */}
      <path
        d="M20 34 C22 37 26 37 28 34"
        stroke="#4A90D9"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
