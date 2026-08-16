/**
 * en.js — English dictionary for Pomarium.
 * -----------------------------------------------------------------------
 * Same key structure as es.js. Uses {0}, {1}, {2}… for interpolation.
 */
const en = {
  // ─── Navbar ───────────────────────────────────────────────────────────
  "nav.myPlants": "My Plants",
  "nav.addPlant": "Add plant",
  "nav.logout": "Log out",
  "nav.openMenu": "Open menu",

  // ─── Auth ─────────────────────────────────────────────────────────────
  "auth.titleLogin": "Welcome back!",
  "auth.titleRegister": "Create your garden",
  "auth.subtitleLogin": "Log into Pomarium to see your plants",
  "auth.subtitleRegister": "Sign up to start growing",
  "auth.namePlaceholder": "Your name",
  "auth.emailPlaceholder": "email@example.com",
  "auth.passwordPlaceholder": "Password",
  "auth.loading": "One moment...",
  "auth.login": "Log in",
  "auth.register": "Sign up",
  "auth.switchToRegister": "Don't have an account? Sign up",
  "auth.switchToLogin": "Already have an account? Log in",
  "auth.error.invalidEmail": "That email doesn't look valid.",
  "auth.error.emailInUse": "That email is already registered.",
  "auth.error.weakPassword": "Password must be at least 6 characters.",
  "auth.error.userNotFound": "We couldn't find an account with that email.",
  "auth.error.wrongPassword": "The password is incorrect.",
  "auth.error.invalidCredential": "Incorrect email or password.",
  "auth.error.default": "Something went wrong. Please try again.",

  // ─── Layout / Footer ─────────────────────────────────────────────────
  "footer.tagline": "Pomarium — grow at your own pace 🌿",
  "footer.subtitle": "Made with love for those who care for their plants step by step.",

  // ─── App / General ────────────────────────────────────────────────────
  "app.loading": "Loading Pomarium...",
  "app.loadingGeneric": "Loading...",
  "app.plantNotFound": "We couldn't find that plant.",
  "app.backToMyPlants": "Back to My Plants",

  // ─── Mis Plantas ──────────────────────────────────────────────────────
  "misPlantas.loading": "Loading your plants...",
  "misPlantas.empty": "You don't have any plants registered yet.",
  "misPlantas.addFirst": "Add my first plant",
  "misPlantas.title": "My Plants 🌿",
  "misPlantas.addPlant": "Add plant",
  "misPlantas.deleteConfirm": "Are you sure you want to say goodbye to {0}? This action cannot be undone.",
  "misPlantas.deleteTitle": "Delete plant",
  "misPlantas.cancel": "Cancel",
  "misPlantas.delete": "Delete",
  "misPlantas.deleting": "Deleting...",

  // ─── Agregar Planta ───────────────────────────────────────────────────
  "agregar.chooseCategory": "Choose a category",
  "agregar.nameYour": "What's your {0} called?",
  "agregar.available": "Available",
  "agregar.unlockHint": "Complete all {0} Decorative Plants to unlock ({1}/{2})",
  "agregar.demo": "Demo",
  "agregar.nameLabel": "Your plant's name *",
  "agregar.namePlaceholder": "E.g. \"Pica-Pica\", \"Frida\"...",
  "agregar.timeLabel": "How old is it? *",
  "agregar.modeAmount": "Weeks / months",
  "agregar.modeDate": "Start date",
  "agregar.weeks": "Weeks",
  "agregar.months": "Months",
  "agregar.timeHint": "Based on the time you enter, your plant will automatically start at the correct stage of its lifecycle (not always at \"Sprout\").",
  "agregar.errorName": "Give your plant a name to continue.",
  "agregar.errorTime": "Enter how old your plant is.",
  "agregar.errorDate": "Choose the date your plant started.",
  "agregar.datePlaceholder": "dd/mm/yyyy",
  "agregar.saving": "Saving...",
  "agregar.submit": "Register plant 🌱",
  "agregar.errorSave": "Couldn't save the plant. Please try again.",

  // ─── Dashboard / PlantHeader ──────────────────────────────────────────
  "dashboard.tagline": "grow. care. unlock.",
  "dashboard.changePlant": "Change plant",
  "dashboard.changePlantShort": "Change",

  // ─── PlantProfile ─────────────────────────────────────────────────────
  "profile.evolutionTree": "Evolution tree",

  // ─── LifecycleCarousel ────────────────────────────────────────────────
  "lifecycle.title": "Lifecycle",
  "lifecycle.unlocked": "✓ day {0}",
  "lifecycle.uploadPhoto": "Upload photo",
  "lifecycle.locked": "Locked",
  "lifecycle.duration.Brote": "1 – 2 weeks",
  "lifecycle.duration.Etapa Vegetativa": "3 – 10 weeks",
  "lifecycle.duration.Floración": "varies by species",
  "lifecycle.duration.Madurez": "permanent",

  // ─── CareTimers ───────────────────────────────────────────────────────
  "care.sectionTitle": "Care · {0}",
  "care.remaining": "{0} {1} remaining",
  "care.needsNow": "Needs {0}!",
  "care.notRequired": "Not required yet",
  "care.notRequiredShort": "Not required",
  "care.water": "Water",
  "care.sunlight": "Sunlight",
  "care.nutrients": "Nutrients",
  "care.waterBtn": "Water",
  "care.sunBtn": "Sunlight",
  "care.nutrientsBtn": "Fertilize",
  "care.aguaNow": "Water now!",
  "care.luzNow": "Provide sunlight!",
  "care.nutrientesNow": "Fertilize now!",

  // ─── Units ────────────────────────────────────────────────────────────
  "unit.días": "days",
  "unit.h": "h",

  // ─── GardenerAdvice ───────────────────────────────────────────────────
  "gardener.name": "Don Tomás",
  "gardener.advice.Brote":
    "Your little plant is just waking up! Keep the soil moist but not waterlogged, and don't expose it to direct sunlight yet.",
  "gardener.advice.Etapa Vegetativa":
    "\"When you see the ribs showing, give it a good drink and let it dry out completely. Rotate it every week, otherwise it'll grow crooked chasing the window.\"",
  "gardener.advice.Floración":
    "Flowers are coming! Don't move it now. Give it a bit of phosphorus-rich fertilizer and be patient — beauty takes time.",
  "gardener.advice.Madurez":
    "Your plant has come a long way, congrats! Now keep it happy: spaced watering, good light, and a gentle fertilizer every month.",

  // ─── ModalDesbloqueo ──────────────────────────────────────────────────
  "modal.validateTitle": "Validate your {0}",
  "modal.validateHint": "Upload a photo showing the \"{0}\" stage.",
  "modal.photoAlt": "Plant preview",
  "modal.uploadPrompt": "Tap to upload a photo",
  "modal.successMsg": "Photo validated! Your plant advanced a stage 🌿",
  "modal.failMsg": "The photo doesn't match the current stage. Try again.",
  "modal.errorMsg": "Something went wrong validating the photo. Try again.",
  "modal.uploading": "Uploading photo...",
  "modal.analyzing": "Analyzing with AI...",
  "modal.validateBtn": "Validate photo",

  // ─── Stage names (display only — internal keys stay in Spanish) ──────
  "stage.Brote": "Sprout",
  "stage.Etapa Vegetativa": "Vegetative Stage",
  "stage.Floración": "Flowering",
  "stage.Madurez": "Maturity",

  // ─── Category names ───────────────────────────────────────────────────
  "category.Plantas Decorativas": "Decorative Plants",
  "category.Cultivos Rápidos": "Quick Crops",
  "category.Frutos de Temporada": "Seasonal Fruits",
  "category.Árboles a Largo Plazo": "Long-term Trees",

  // ─── Plant Names ──────────────────────────────────────────────────────
  "category.Cactus Estrella (Astrophytum)": "Star Cactus (Astrophytum)",
  "category.Suculenta Rosa": "Pink Succulent",
  "category.Aloe Vera": "Aloe Vera",
  "category.Albahaca": "Basil",
  "category.Rábano": "Radish",
  "category.Tomatero": "Tomato Plant",
  "category.Fresa": "Strawberry",
  "category.Limonero": "Lemon Tree",

  // ─── Families ─────────────────────────────────────────────────────────
  "category.Cactaceae": "Cactaceae",
  "category.Crassulaceae": "Crassulaceae",
  "category.Asphodelaceae": "Asphodelaceae",
  "category.Lamiaceae": "Lamiaceae",
  "category.Brassicaceae": "Brassicaceae",
  "category.Solanaceae": "Solanaceae",
  "category.Rosaceae": "Rosaceae",
  "category.Rutaceae": "Rutaceae",

  // ─── Duration labels (from catalog) ───────────────────────────────────
  "duration.Semanas a meses": "Weeks to months",
  "duration.Semanas": "Weeks",
  "duration.Meses": "Months",
  "duration.Años": "Years",

  // ─── Difficulty ───────────────────────────────────────────────────────
  "difficulty.Fácil": "Easy",
  "difficulty.Media": "Medium",
  "difficulty.Difícil": "Hard",

  // ─── Language toggle ──────────────────────────────────────────────────
  "lang.label": "EN",
};

export default en;
