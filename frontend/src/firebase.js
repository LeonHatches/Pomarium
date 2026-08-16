import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

/**
 * firebase.js
 * -----------------------------------------------------------------------
 * Reemplaza estas credenciales por las de TU proyecto de Firebase
 * (Consola de Firebase > Configuración del proyecto > Tus apps).
 * Se recomienda moverlas a variables de entorno (frontend/.env) tal como
 * indica el README, en vez de dejarlas escritas en este archivo.
 */
const firebaseConfig = {
  apiKey: "AIzaSyB3OEgX0chbkGsTMBgUtgsyRxjxWfsvkes",
  authDomain: "pomarium-433db.firebaseapp.com",
  projectId: "pomarium-433db",
  storageBucket: "pomarium-433db.firebasestorage.app",
  messagingSenderId: "262464785559",
  appId: "1:262464785559:web:9f632730c5edb98e9d6dd2"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/* ============================== AUTH ================================ */

export const registrarUsuario = async (email, password, nombre) => {
  const credencial = await createUserWithEmailAndPassword(auth, email, password);
  if (nombre) {
    await updateProfile(credencial.user, { displayName: nombre });
  }
  // Perfil inicial del usuario en Firestore (nivel/categorías desbloqueadas).
  await setDoc(
    doc(db, "usuarios", credencial.user.uid),
    {
      email,
      nombre: nombre || "",
      creadoEn: serverTimestamp(),
    },
    { merge: true }
  );
  return credencial;
};

export const iniciarSesion = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const cerrarSesion = () => signOut(auth);

export const observarSesion = (callback) => onAuthStateChanged(auth, callback);

/* ============================ PERFIL ================================= */

export const obtenerPerfilUsuario = async (uid) => {
  const snap = await getDoc(doc(db, "usuarios", uid));
  return snap.exists() ? snap.data() : null;
};

/* ============================ PLANTAS =================================
 * Cada planta del usuario se guarda en:
 *   usuarios/{uid}/plantas/{plantaId}
 * con la forma:
 * {
 *   id, especieId, especieNombre, categoria, categoriaId,
 *   nombrePersonalizado, fechaInicio (ISO), etapaActual,
 *   etapas: { [nombreEtapa]: { desbloqueada, fotoURL, fechaDesbloqueo } },
 *   actualizadoEn
 * }
 * Esto asegura que, al recargar la página o volver a iniciar sesión,
 * TODAS las plantas del usuario (nombres, tiempos de vida y progreso de
 * etapas) se recuperan intactas — requerimiento 6.
 * ======================================================================= */

export const crearPlantaUsuario = async (uid, planta) => {
  const ref_ = doc(db, "usuarios", uid, "plantas", planta.id);
  await setDoc(ref_, { ...planta, actualizadoEn: serverTimestamp() });
  return planta;
};

export const obtenerPlantasUsuario = async (uid) => {
  const snap = await getDocs(collection(db, "usuarios", uid, "plantas"));
  return snap.docs.map((d) => d.data());
};

export const obtenerPlantaUsuario = async (uid, plantaId) => {
  const snap = await getDoc(doc(db, "usuarios", uid, "plantas", plantaId));
  return snap.exists() ? snap.data() : null;
};

export const actualizarPlantaUsuario = (uid, plantaId, cambios) =>
  updateDoc(doc(db, "usuarios", uid, "plantas", plantaId), {
    ...cambios,
    actualizadoEn: serverTimestamp(),
  });

export const eliminarPlantaUsuario = (uid, plantaId) =>
  deleteDoc(doc(db, "usuarios", uid, "plantas", plantaId));

/**
 * Avanza la planta a una nueva etapa y guarda la foto validada como
 * evidencia permanente de esa etapa (reemplaza el ícono genérico en la
 * tarjeta de esa etapa — requerimiento 8).
 */
export const desbloquearEtapaPlanta = async (uid, plantaId, etapaDesbloqueada, fotoURL, etapasActuales) => {
  const etapas = {
    ...etapasActuales,
    [etapaDesbloqueada]: {
      desbloqueada: true,
      fotoURL: fotoURL || null,
      fechaDesbloqueo: new Date().toISOString(),
    },
  };
  await updateDoc(doc(db, "usuarios", uid, "plantas", plantaId), {
    etapaActual: etapaDesbloqueada,
    etapas,
    actualizadoEn: serverTimestamp(),
  });
  return etapas;
};

/* ============================ STORAGE ================================= */

export const subirFotoPlanta = async (uid, plantaId, etapa, archivo) => {
  const rutaArchivo = `usuarios/${uid}/plantas/${plantaId}/${etapa}_${Date.now()}_${archivo.name}`;
  const storageRef = ref(storage, rutaArchivo);
  await uploadBytes(storageRef, archivo);
  return getDownloadURL(storageRef);
};
