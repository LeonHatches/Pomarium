import React from "react";

/**
 * IconBase.jsx
 * -----------------------------------------------------------------------
 * Envoltorio compartido por TODOS los íconos sketchy de Pomarium.
 * Estandariza el viewBox, el grosor de trazo y el "linecap" redondeado
 * para que cualquier ícono nuevo (o reemplazado desde Figma) mantenga
 * automáticamente el mismo aspecto "dibujado a mano".
 *
 * Uso:
 *   <IconBase className="w-10 h-10" title="Cactus estrella">
 *     <path d="..." />
 *   </IconBase>
 *
 * Tu compañero de diseño puede reemplazar el <svg> interno de cualquier
 * ícono (children) sin tocar esta base, o ajustar aquí el estilo global
 * (grosor de línea, color por defecto, etc.) para que se propague a
 * todos los íconos de una sola vez.
 */
export default function IconBase({
  children,
  className = "w-8 h-8",
  viewBox = "0 0 48 48",
  strokeWidth = 2.2,
  color = "currentColor",
  title,
}) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}
