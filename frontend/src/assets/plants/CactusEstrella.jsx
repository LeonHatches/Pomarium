import React from "react";
import { IconBase } from "../icons";

/** Astrophytum / Cactus Estrella — reemplazable por el SVG final de Figma. */
export default function CactusEstrella(props) {
  return (
    <IconBase title="Cactus Estrella" {...props}>
      <path d="M24 10 C30 14 34 20 34 27 C34 34 30 39 24 39 C18 39 14 34 14 27 C14 20 18 14 24 10 Z" />
      <path d="M24 10 L24 39 M15 20 L33 34 M33 20 L15 34" />
      <circle cx="24" cy="10" r="1.4" fill="currentColor" />
    </IconBase>
  );
}
