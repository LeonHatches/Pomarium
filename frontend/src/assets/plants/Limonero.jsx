import React from "react";
import { IconBase } from "../icons";

/** Limonero — reemplazable por el SVG final de Figma. */
export default function Limonero(props) {
  return (
    <IconBase title="Limonero" {...props}>
      <path d="M24 44 L24 26" />
      <circle cx="24" cy="16" r="12" />
      <path d="M22 6 C22 6 26 3 30 6" />
      <ellipse cx="20" cy="12" rx="4" ry="2.4" transform="rotate(-30 20 12)" />
    </IconBase>
  );
}
