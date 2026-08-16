import React, { useState } from "react";
import { registrarUsuario, iniciarSesion } from "../firebase";
import { useI18n } from "../i18n/I18nContext";

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
  const { t } = useI18n();

  const traducirErrorFirebase = (codigo) => {
    const keyMap = {
      "auth/invalid-email": "auth.error.invalidEmail",
      "auth/email-already-in-use": "auth.error.emailInUse",
      "auth/weak-password": "auth.error.weakPassword",
      "auth/user-not-found": "auth.error.userNotFound",
      "auth/wrong-password": "auth.error.wrongPassword",
      "auth/invalid-credential": "auth.error.invalidCredential",
    };
    return t(keyMap[codigo] || "auth.error.default");
  };

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
          {modo === "login" ? t("auth.titleLogin") : t("auth.titleRegister")}
        </h1>
        <p className="text-center text-sm text-ink/70 mb-6">
          {modo === "login" ? t("auth.subtitleLogin") : t("auth.subtitleRegister")}
        </p>

        <form onSubmit={manejarSubmit} className="flex flex-col gap-4">
          {modo === "registro" && (
            <input
              type="text"
              required
              placeholder={t("auth.namePlaceholder")}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="sketchy-border bg-cream px-4 py-2 outline-none focus:shadow-sketchy-sm"
            />
          )}
          <input
            type="email"
            required
            placeholder={t("auth.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sketchy-border bg-cream px-4 py-2 outline-none focus:shadow-sketchy-sm"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder={t("auth.passwordPlaceholder")}
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
              ? t("auth.loading")
              : modo === "login"
              ? t("auth.login")
              : t("auth.register")}
          </button>
        </form>

        <button
          onClick={() => setModo(modo === "login" ? "registro" : "login")}
          className="mt-5 text-sm text-leaf-dark underline underline-offset-2 mx-auto block"
        >
          {modo === "login" ? t("auth.switchToRegister") : t("auth.switchToLogin")}
        </button>
      </div>
    </div>
  );
}
