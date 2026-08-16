/**
 * es.js — Diccionario de textos en Español para Pomarium.
 * -----------------------------------------------------------------------
 * Usa marcadores {0}, {1}, {2}… para interpolación dinámica.
 * Cada clave sigue la convención: seccion.subseccion
 */
const es = {
  // ─── Navbar ───────────────────────────────────────────────────────────
  "nav.myPlants": "Mis Plantas",
  "nav.addPlant": "Añadir planta",
  "nav.logout": "Cerrar sesión",
  "nav.openMenu": "Abrir menú",

  // ─── Auth ─────────────────────────────────────────────────────────────
  "auth.titleLogin": "¡Hola de nuevo!",
  "auth.titleRegister": "Crea tu huerto",
  "auth.subtitleLogin": "Ingresa a Pomarium para ver tus plantas",
  "auth.subtitleRegister": "Regístrate para empezar a cultivar",
  "auth.namePlaceholder": "Tu nombre",
  "auth.emailPlaceholder": "correo@ejemplo.com",
  "auth.passwordPlaceholder": "Contraseña",
  "auth.loading": "Un momento...",
  "auth.login": "Entrar",
  "auth.register": "Registrarme",
  "auth.switchToRegister": "¿No tienes cuenta? Regístrate",
  "auth.switchToLogin": "¿Ya tienes cuenta? Inicia sesión",
  "auth.error.invalidEmail": "Ese correo no parece válido.",
  "auth.error.emailInUse": "Ese correo ya está registrado.",
  "auth.error.weakPassword": "La contraseña debe tener al menos 6 caracteres.",
  "auth.error.userNotFound": "No encontramos una cuenta con ese correo.",
  "auth.error.wrongPassword": "La contraseña es incorrecta.",
  "auth.error.invalidCredential": "Correo o contraseña incorrectos.",
  "auth.error.default": "Ocurrió un error. Intenta de nuevo.",

  // ─── Layout / Footer ─────────────────────────────────────────────────
  "footer.tagline": "Pomarium — cultiva a tu ritmo 🌿",
  "footer.subtitle": "Hecho con cariño para quienes cuidan sus plantas paso a paso.",

  // ─── App / General ────────────────────────────────────────────────────
  "app.loading": "Cargando Pomarium...",
  "app.loadingGeneric": "Cargando...",
  "app.plantNotFound": "No encontramos esa planta.",
  "app.backToMyPlants": "Volver a Mis Plantas",

  // ─── Mis Plantas ──────────────────────────────────────────────────────
  "misPlantas.loading": "Cargando tus plantas...",
  "misPlantas.empty": "Todavía no tienes plantas registradas.",
  "misPlantas.addFirst": "Añadir mi primera planta",
  "misPlantas.title": "Mis Plantas 🌿",
  "misPlantas.addPlant": "Añadir planta",
  "misPlantas.deleteConfirm": "¿Estás seguro de que deseas despedirte de {0}? Esta acción no se puede deshacer.",
  "misPlantas.deleteTitle": "Eliminar planta",
  "misPlantas.cancel": "Cancelar",
  "misPlantas.delete": "Eliminar",
  "misPlantas.deleting": "Eliminando...",

  // ─── Agregar Planta ───────────────────────────────────────────────────
  "agregar.chooseCategory": "Elige una categoría",
  "agregar.nameYour": "¿Cómo se llama tu {0}?",
  "agregar.available": "Disponible",
  "agregar.unlockHint": "Completa las {0} Plantas Decorativas para desbloquear ({1}/{2})",
  "agregar.demo": "Demo",
  "agregar.nameLabel": "Nombre de tu planta *",
  "agregar.namePlaceholder": "Ej. \"Pica-Pica\", \"Frida\"...",
  "agregar.timeLabel": "¿Cuánto tiempo tiene? *",
  "agregar.modeAmount": "Semanas / meses",
  "agregar.modeDate": "Fecha de inicio",
  "agregar.weeks": "Semanas",
  "agregar.months": "Meses",
  "agregar.timeHint": "Según el tiempo que indiques, tu planta arrancará automáticamente en la etapa correcta de su ciclo de vida (no siempre en \"Brote\").",
  "agregar.errorName": "Ponle un nombre a tu planta para continuar.",
  "agregar.errorTime": "Indica cuánto tiempo tiene tu planta.",
  "agregar.errorDate": "Elige la fecha en que empezó tu planta.",
  "agregar.saving": "Guardando...",
  "agregar.submit": "Registrar planta 🌱",
  "agregar.errorSave": "No se pudo guardar la planta. Intenta de nuevo.",

  // ─── Dashboard / PlantHeader ──────────────────────────────────────────
  "dashboard.tagline": "cultiva. cuida. desbloquea.",
  "dashboard.changePlant": "Cambiar planta",
  "dashboard.changePlantShort": "Cambiar",

  // ─── PlantProfile ─────────────────────────────────────────────────────
  "profile.evolutionTree": "Árbol de evolución",

  // ─── LifecycleCarousel ────────────────────────────────────────────────
  "lifecycle.title": "Ciclo de vida",
  "lifecycle.unlocked": "✓ día {0}",
  "lifecycle.uploadPhoto": "Subir foto",
  "lifecycle.locked": "Bloqueada",
  "lifecycle.duration.Brote": "1 – 2 semanas",
  "lifecycle.duration.Etapa Vegetativa": "3 – 10 semanas",
  "lifecycle.duration.Floración": "según especie",
  "lifecycle.duration.Madurez": "permanente",

  // ─── CareTimers ───────────────────────────────────────────────────────
  "care.sectionTitle": "Cuidados · {0}",
  "care.remaining": "{0} {1} restantes",
  "care.needsNow": "¡Necesita {0}!",
  "care.notRequired": "No requiere aún",
  "care.notRequiredShort": "No requiere",
  "care.water": "Agua",
  "care.sunlight": "Luz solar",
  "care.nutrients": "Nutrientes",
  "care.waterBtn": "Regar",
  "care.sunBtn": "Registrar",
  "care.nutrientsBtn": "Abonar",
  "care.waterNow": "¡Regar ahora!",
  "care.sunNow": "¡Registrar ahora!",
  "care.nutrientsNow": "¡Abonar ahora!",

  // ─── Units ────────────────────────────────────────────────────────────
  "unit.días": "días",
  "unit.h": "h",

  // ─── GardenerAdvice ───────────────────────────────────────────────────
  "gardener.name": "Don Tomás",
  "gardener.advice.Brote":
    "¡Tu plantita apenas despierta! Mantenle la tierra húmeda pero sin encharcar, y no la expongas al sol directo todavía.",
  "gardener.advice.Etapa Vegetativa":
    "\"Cuando veas que las costillas se le marcan, ahí sí, dale un buen trago de agua y deja que se seque del todo. Y gíralo cada semana, que si no te crece torcido buscando la ventana.\"",
  "gardener.advice.Floración":
    "¡Se acercan las flores! No la muevas de lugar ahora. Dale un poquito de abono rico en fósforo y sé paciente — la belleza toma su tiempo.",
  "gardener.advice.Madurez":
    "Tu planta llegó lejos, ¡felicidades! Ahora toca mantenerla feliz: riego espaciado, buena luz y un abono suave cada mes.",

  // ─── ModalDesbloqueo ──────────────────────────────────────────────────
  "modal.validateTitle": "Valida tu {0}",
  "modal.validateHint": "Sube una foto que muestre la etapa \"{0}\".",
  "modal.photoAlt": "Previsualización de la planta",
  "modal.uploadPrompt": "Toca para subir una foto",
  "modal.successMsg": "¡Foto validada! Tu planta avanzó de etapa 🌿",
  "modal.failMsg": "La foto no coincide con la etapa actual. Intenta de nuevo.",
  "modal.errorMsg": "Ocurrió un problema al validar la foto. Intenta de nuevo.",
  "modal.uploading": "Subiendo foto...",
  "modal.analyzing": "Analizando con IA...",
  "modal.validateBtn": "Validar foto",

  // ─── Stage names (display only — internal keys stay in Spanish) ──────
  "stage.Brote": "Brote",
  "stage.Etapa Vegetativa": "Etapa Vegetativa",
  "stage.Floración": "Floración",
  "stage.Madurez": "Madurez",

  // ─── Category names ───────────────────────────────────────────────────
  "category.Plantas Decorativas": "Plantas Decorativas",
  "category.Cultivos Rápidos": "Cultivos Rápidos",
  "category.Frutos de Temporada": "Frutos de Temporada",
  "category.Árboles a Largo Plazo": "Árboles a Largo Plazo",

  // ─── Duration labels (from catalog) ───────────────────────────────────
  "duration.Semanas a meses": "Semanas a meses",
  "duration.Semanas": "Semanas",
  "duration.Meses": "Meses",
  "duration.Años": "Años",

  // ─── Difficulty ───────────────────────────────────────────────────────
  "difficulty.Fácil": "Fácil",
  "difficulty.Media": "Media",
  "difficulty.Difícil": "Difícil",

  // ─── Language toggle ──────────────────────────────────────────────────
  "lang.label": "ES",
};

export default es;
