import React, { useState } from "react";
import { registrarUsuario, iniciarSesion } from "../firebase";

/**
 * Auth.jsx
 * Pantalla de inicio de sesión / registro con Firebase Authentication (Email/Password).
 */
export default function Auth() {
  const [modo, setModo] = useState("login"); // "login" | "registro"
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      if (modo === "login") {
        await iniciarSesion(email, password);
      } else {
        await registrarUsuario(email, password, nombre);
      }
    } catch (err) {
      setError(traducirErrorFirebase(err.code));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="sketchy-border bg-cream-dark shadow-sketchy p-8 w-full max-w-sm">
        <h1 className="font-hand text-3xl text-leaf-dark mb-1 text-center">
          {modo === "login" ? "¡Hola de nuevo!" : "Crea tu huerto"}
        </h1>
        <p className="text-center text-sm text-ink/70 mb-6">
          {modo === "login"
            ? "Ingresa a Pomarium para ver tus plantas"
            : "Regístrate para empezar a cultivar"}
        </p>

        <form onSubmit={manejarSubmit} className="flex flex-col gap-4">
          {modo === "registro" && (
            <input
              type="text"
              required
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="sketchy-border bg-cream px-4 py-2 outline-none focus:shadow-sketchy-sm"
            />
          )}
          <input
            type="email"
            required
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sketchy-border bg-cream px-4 py-2 outline-none focus:shadow-sketchy-sm"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="sketchy-border bg-cream px-4 py-2 outline-none focus:shadow-sketchy-sm"
          />

          {error && <p className="text-coral text-sm">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="sketchy-border bg-leaf text-cream font-hand text-lg py-2 shadow-sketchy-sm hover:-translate-y-0.5 transition-transform disabled:opacity-60"
          >
            {cargando
              ? "Un momento..."
              : modo === "login"
              ? "Entrar"
              : "Registrarme"}
          </button>
        </form>

        <button
          onClick={() => setModo(modo === "login" ? "registro" : "login")}
          className="mt-5 text-sm text-leaf-dark underline underline-offset-2 mx-auto block"
        >
          {modo === "login"
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
}

function traducirErrorFirebase(codigo) {
  const mensajes = {
    "auth/invalid-email": "Ese correo no parece válido.",
    "auth/email-already-in-use": "Ese correo ya está registrado.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/user-not-found": "No encontramos una cuenta con ese correo.",
    "auth/wrong-password": "La contraseña es incorrecta.",
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
  };
  return mensajes[codigo] || "Ocurrió un error. Intenta de nuevo.";
}
