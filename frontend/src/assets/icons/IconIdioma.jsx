import React from "react";
import IconBase from "./IconBase";

/**
 * IconIdioma — Globo terráqueo sketchy para el toggle de idioma.
 */
export default function IconIdioma(props) {
  return (
    <IconBase {...props} title="Idioma">
      <circle cx="24" cy="24" r="16" />
      <ellipse cx="24" cy="24" rx="8" ry="16" />
      <line x1="8" y1="24" x2="40" y2="24" />
      <path d="M10 16 Q24 13 38 16" />
      <path d="M10 32 Q24 35 38 32" />
    </IconBase>
  );
}
