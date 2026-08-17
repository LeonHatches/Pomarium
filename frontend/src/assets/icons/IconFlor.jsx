import React from "react";
import IconBase from "./IconBase";

/** Rose / flower icon — used in the "Cambiar planta" header button. */
export default function IconFlor(props) {
  return (
    <IconBase title="Cambiar planta" {...props}>
      {/* Petals */}
      <circle cx="24" cy="16" r="5" fill="currentColor" opacity="0.25" stroke="currentColor" />
      <circle cx="16" cy="22" r="5" fill="currentColor" opacity="0.25" stroke="currentColor" />
      <circle cx="32" cy="22" r="5" fill="currentColor" opacity="0.25" stroke="currentColor" />
      <circle cx="18" cy="30" r="5" fill="currentColor" opacity="0.25" stroke="currentColor" />
      <circle cx="30" cy="30" r="5" fill="currentColor" opacity="0.25" stroke="currentColor" />
      {/* Center */}
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      {/* Stem */}
      <path d="M24 28 L24 42" />
      <path d="M24 36 Q28 32 32 34" />
    </IconBase>
  );
}
