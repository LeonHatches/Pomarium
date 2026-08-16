import React from "react";
import IconBase from "./IconBase";

/** Ícono "Mis Plantas" — navbar (maceta con brote). */
export default function IconMisPlantas(props) {
  return (
    <IconBase title="Mis plantas" {...props}>
      <path d="M24 27 C14 27 12 15 18 12 C20 17 24 18 24 18 C24 18 28 17 30 12 C36 15 34 27 24 27 Z" />
      <path d="M24 27 L24 32" />
      <path d="M13 32 L35 32 L33 41 L15 41 Z" />
    </IconBase>
  );
}
