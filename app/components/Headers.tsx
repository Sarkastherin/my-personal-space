import { useAuth } from "~/context/Auth";
import { useUI } from "~/context/UIContext";
import { useNavigate, NavLink } from "react-router";
import { TbLogout2 } from "react-icons/tb";
import { FaSun, FaMoon } from "react-icons/fa";
import { Button, ButtonLink } from "./Buttons";
import { TbShoppingBagPlus } from "react-icons/tb";

import { useState, useRef } from "react";
export function Header() {
  const { toggleTheme, theme } = useUI();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 shadow-lg border-b border-white/20 dark:border-gray-700/30">
      <div className="flex items-center gap-4">
        <NavLink to={"/"} className={"logo text-2xl md:text-3xl"}>My Space</NavLink>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Botón de logout */}
        <ButtonLink variant="blue" to="/nuevo-gasto" size="sm" className="flex items-center gap-2">
          <TbShoppingBagPlus className="w-4 h-4" />
          <span className="hidden md:inline">Gasto</span>
        </ButtonLink>
        <Button
          variant="gray"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <TbLogout2 className="w-4 h-4" />
          <span className="hidden md:inline">Cerrar sesión</span>
        </Button>

        {/* Botón de cambio de tema */}
        <Button
          variant={`${theme === "dark" ? "yellow" : "dark"}`}
          size="sm"
          onClick={() => {
            toggleTheme();
          }}
          className="flex items-center gap-2"
          title={
            theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
          }
        >
          {theme === "dark" ? (
            <FaSun className="w-4 h-4" />
          ) : (
            <FaMoon className="w-4 h-4" />
          )}
          <span className="hidden md:inline">
            {theme === "dark" ? "Modo claro" : "Modo oscuro"}
          </span>
        </Button>
      </div>
    </header>
  );
}