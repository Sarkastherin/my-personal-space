import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
type ThemeProps = "dark" | "light";
type UIContextType = {
  toggleTheme: () => void;
  theme: ThemeProps;
};
const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  // Inicializar con 'light' por defecto para evitar problemas de SSR
  const [theme, setTheme] = useState<ThemeProps>("light");

  // Usar useEffect para detectar el tema preferido después del montaje
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem('flowbite-theme') as ThemeProps;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
      
      // Aplicar el tema a Flowbite
      applyTheme(initialTheme);
    }
  }, []);

  // Función para aplicar el tema
  const applyTheme = (newTheme: ThemeProps) => {
    if (typeof document !== "undefined") {
      const htmlElement = document.documentElement;
      const bodyElement = document.body;
      
      if (newTheme === "dark") {
        htmlElement.classList.add("dark");
        bodyElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
        bodyElement.classList.remove("dark");
      }
    }
  };

  // Efecto para aplicar cambios de tema
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Guardar en localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem('flowbite-theme', newTheme);
    }
    
    // Actualizar estado (esto triggereará el useEffect que aplica el tema)
    setTheme(newTheme);
  };

  return (
    <UIContext.Provider
      value={{
        toggleTheme,
        theme,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI debe usarse dentro de <UIProvider>");
  return context;
}
