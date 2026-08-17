import React from "react";
import PlantHeader from "./dashboard/PlantHeader";
import PlantProfile from "./dashboard/PlantProfile";
import LifecycleCarousel from "./dashboard/LifecycleCarousel";
import CareTimers from "./dashboard/CareTimers";
import GardenerAdvice from "./dashboard/GardenerAdvice";

/**
 * Dashboard.jsx
 * -----------------------------------------------------------------------
 * Redesigned plant detail view matching the Pomarium UI mockup:
 *
 *  1. PlantHeader     — Logo + "Cambiar planta" button
 *  2. PlantProfile    — Tags, custom name, illustration, evolution bar
 *  3. LifecycleCarousel — 3-card carousel of lifecycle stages
 *  4. CareTimers      — Three circular SVG progress rings (water/sun/nutrients)
 *  5. GardenerAdvice  — Don Tomás speech bubble with stage-specific tips
 *
 * Business logic (Firebase sync, stage unlocking) remains in App.jsx.
 * This component is purely presentational + local carousel state.
 */
export default function Dashboard({ planta, onAbrirValidacion, onRegistrarCuidado }) {
  if (!planta) return null;

  return (
    <div className="flex flex-col gap-8 pb-8">
      <PlantHeader />
      <PlantProfile planta={planta} />
      <LifecycleCarousel planta={planta} onAbrirValidacion={onAbrirValidacion} />
      <CareTimers planta={planta} onRegistrarCuidado={onRegistrarCuidado} />
      <GardenerAdvice planta={planta} />
    </div>
  );
}
