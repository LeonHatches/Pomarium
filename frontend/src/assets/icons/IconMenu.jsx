import React from "react";
import IconBase from "./IconBase";

/** Menú hamburguesa sketchy — navbar responsive (móvil). */
export default function IconMenu(props) {
  return (
    <IconBase title="Menú" {...props}>
      <path d="M8 14 L40 14" />
      <path d="M8 24 L40 24" />
      <path d="M8 34 L40 34" />
    </IconBase>
  );
}
