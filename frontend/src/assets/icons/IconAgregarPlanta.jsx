import React from "react";
import IconBase from "./IconBase";

/** Ícono "Añadir planta" — navbar (maceta con signo +). */
export default function IconAgregarPlanta(props) {
  return (
    <IconBase title="Añadir planta" {...props}>
      <path d="M13 33 L35 33 L33 42 L15 42 Z" />
      <path d="M24 33 L24 20" />
      <path d="M18 26 L30 26" />
      <path d="M24 20 L24 12" />
      <path d="M19 15 L29 15" />
    </IconBase>
  );
}
