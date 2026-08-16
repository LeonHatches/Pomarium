import React from "react";
import IconBase from "./IconBase";

/** Candado sketchy — etapas y categorías bloqueadas. Reemplazable 1:1. */
export default function IconCandado(props) {
  return (
    <IconBase title="Bloqueado" {...props}>
      <path d="M14 22 L14 16 Q14 8 24 8 Q34 8 34 16 L34 22" />
      <rect x="10" y="22" width="28" height="18" rx="3" />
      <circle cx="24" cy="30" r="2.6" fill="currentColor" />
      <path d="M24 32.5 L24 36" />
    </IconBase>
  );
}
