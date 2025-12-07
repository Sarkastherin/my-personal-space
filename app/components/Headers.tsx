import { useAuth } from "~/context/Auth";
import { useUI } from "~/context/UIContext";
import { useNavigate, NavLink } from "react-router";
import { TbLogout2 } from "react-icons/tb";
import { FaSun, FaMoon } from "react-icons/fa";
import { Button } from "./Buttons";

import { useState, useRef } from "react";
export function Header() {
  const { toggleTheme, theme } = useUI();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

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
/* export function Subheader({
  title,
  icon,
  back_path,
}: {
  title: string;
  icon: { component: IconType; color: string };
  back_path?: string;
}) {
  const IconComponent = getIcon({
    icon: icon.component,
    size: 6,
    color: icon.color,
  });
  return (
    <header className="w-full flex justify-between items-center py-8">
      <div className="flex items-center gap-3">
        {back_path && (
          <NavLink
            to={back_path}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
          </NavLink>
        )}
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          {IconComponent}
          {title}
        </h2>
      </div>
    </header>
  );
} */
