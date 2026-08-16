import React from "react";
import IconBase from "./IconBase";

export default function IconSol(props) {
  return (
    <IconBase title="Luz solar" {...props}>
      <circle cx="24" cy="24" r="9" />
      <path d="M24 4 L24 10 M24 38 L24 44 M4 24 L10 24 M38 24 L44 24 M9 9 L13 13 M35 35 L39 39 M9 39 L13 35 M35 13 L39 9" />
    </IconBase>
  );
}
