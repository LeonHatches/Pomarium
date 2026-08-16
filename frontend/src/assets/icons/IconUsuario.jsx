import React from "react";
import IconBase from "./IconBase";

/** Perfil de usuario — navbar. */
export default function IconUsuario(props) {
  return (
    <IconBase title="Perfil" {...props}>
      <circle cx="24" cy="17" r="8" />
      <path d="M8 40 Q8 26 24 26 Q40 26 40 40" />
    </IconBase>
  );
}
