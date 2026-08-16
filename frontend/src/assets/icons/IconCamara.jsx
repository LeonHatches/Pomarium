import React from "react";
import IconBase from "./IconBase";

/** Cámara sketchy — usada para "subir foto" y validar etapas. */
export default function IconCamara(props) {
  return (
    <IconBase title="Subir foto" {...props}>
      <path d="M8 16 Q8 13 11 13 L16 13 L18 9 L30 9 L32 13 L37 13 Q40 13 40 16 L40 33 Q40 36 37 36 L11 36 Q8 36 8 33 Z" />
      <circle cx="24" cy="24" r="7" />
      <circle cx="33" cy="17" r="1.4" fill="currentColor" />
    </IconBase>
  );
}
