import React from "react";
import IconBase from "./IconBase";

/** Hoja simple — usada como marcador genérico de etapa desbloqueada. */
export default function IconHoja(props) {
  return (
    <IconBase title="Hoja" {...props}>
      <path d="M24 40 C10 34 8 18 22 8 C36 18 38 34 24 40 Z" />
      <path d="M24 40 L24 16" />
    </IconBase>
  );
}
