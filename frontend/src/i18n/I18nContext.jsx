import React, { createContext, useContext, useState, useCallback } from "react";
import es from "./es";
import en from "./en";

/**
 * I18nContext.jsx
 * -----------------------------------------------------------------------
 * Contexto de internacionalización para Pomarium.
 *
 * Provee:
 *   - idioma      → "es" | "en"
 *   - setIdioma   → cambia idioma y persiste en localStorage
 *   - t(key, …)   → traduce una clave con interpolación {0}, {1}, …
 *
 * La preferencia se guarda en localStorage("pomarium-lang") para que
 * sobreviva recargas de página.
 *
 * Uso en componentes:
 *   const { t, idioma, setIdioma } = useI18n();
 *   <p>{t("auth.titleLogin")}</p>
 *   <p>{t("agregar.nameYour", especie.nombre)}</p>
 */

const diccionarios = { es, en };

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [idioma, setIdiomaState] = useState(() => {
    try {
      const guardado = localStorage.getItem("pomarium-lang");
      return guardado && diccionarios[guardado] ? guardado : "es";
    } catch {
      return "es";
    }
  });

  const setIdioma = useCallback((code) => {
    setIdiomaState(code);
    try {
      localStorage.setItem("pomarium-lang", code);
    } catch {
      /* localStorage no disponible — falla silenciosa */
    }
  }, []);

  /**
   * Traductor con interpolación posicional.
   * t("care.remaining", 7, "días") → "7 días restantes"
   * Fallback: diccionario español → la propia clave.
   */
  const t = useCallback(
    (key, ...args) => {
      let val = diccionarios[idioma]?.[key] ?? diccionarios.es?.[key] ?? key;
      if (args.length > 0) {
        args.forEach((arg, i) => {
          val = val.replace(`{${i}}`, arg);
        });
      }
      return val;
    },
    [idioma]
  );

  return (
    <I18nContext.Provider value={{ idioma, setIdioma, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n debe usarse dentro de <I18nProvider>");
  }
  return ctx;
}
