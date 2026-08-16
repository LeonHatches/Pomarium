import React from "react";
import IconBase from "./IconBase";

/** Cerrar sesión — navbar. */
export default function IconSalir(props) {
  return (
    <IconBase title="Cerrar sesión" {...props}>
      <path d="M20 8 L12 8 Q9 8 9 11 L9 37 Q9 40 12 40 L20 40" />
      <path d="M22 24 L40 24" />
      <path d="M33 16 L41 24 L33 32" />
    </IconBase>
  );
}
