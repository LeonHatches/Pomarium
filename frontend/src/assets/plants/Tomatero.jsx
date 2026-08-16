import React from "react";
import { IconBase } from "../icons";

/** Tomatero — reemplazable por el SVG final de Figma. */
export default function Tomatero(props) {
  return (
    <IconBase title="Tomatero" {...props}>
      <circle cx="24" cy="27" r="12" />
      <path d="M24 15 L21 9 M24 15 L24 8 M24 15 L27 9" />
      <path d="M14 24 C10 20 10 14 14 11" />
    </IconBase>
  );
}
