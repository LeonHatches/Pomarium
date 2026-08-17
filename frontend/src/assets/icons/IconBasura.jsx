import React from "react";
import IconBase from "./IconBase";

/**
 * IconBasura — Tacho de basura sketchy para el botón de eliminar planta.
 */
export default function IconBasura(props) {
  return (
    <IconBase {...props} title="Eliminar">
      <path d="M14 18 L14 38 C14 39.5 15.5 41 17 41 L31 41 C32.5 41 34 39.5 34 38 L34 18" />
      <line x1="10" y1="14" x2="38" y2="14" />
      <path d="M18 14 L18 10 C18 9 19 8 20 8 L28 8 C29 8 30 9 30 10 L30 14" />
      <line x1="21" y1="22" x2="21" y2="35" />
      <line x1="27" y1="22" x2="27" y2="35" />
    </IconBase>
  );
}
