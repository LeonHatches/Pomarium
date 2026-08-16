import React from "react";
import { IconBase } from "../icons";

/** Suculenta Rosa — reemplazable por el SVG final de Figma. */
export default function SuculentaRosa(props) {
  return (
    <IconBase title="Suculenta Rosa" {...props}>
      <circle cx="24" cy="26" r="5.5" />
      <circle cx="24" cy="26" r="10.5" />
      <circle cx="24" cy="26" r="15.5" />
      <path d="M24 10 L24 15.5 M38 26 L33.5 26 M24 42 L24 36.5 M10 26 L14.5 26" />
    </IconBase>
  );
}
