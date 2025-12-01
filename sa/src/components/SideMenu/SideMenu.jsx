import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdExitToApp,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaUserPlus, FaListAlt, FaCalendarCheck } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";

const SideMenu = ({ isCollapsed: propCollapsed = false, setIsCollapsed: propSetIsCollapsed } = {}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [localCollapsed, setLocalCollapsed] = useState(propCollapsed);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Use the parent state if provided (controlled), otherwise fallback to local
  const isCollapsed = propSetIsCollapsed ? propCollapsed : localCollapsed;
  const setIsCollapsed = propSetIsCollapsed || setLocalCollapsed;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Mobile toggle button (only visible on small screens) */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-500 text-white p-2 rounded shadow"
        aria-label="Open Menu"
      >
        <MdMenu size={24} />
      </button>

      {/* Desktop / large screens side menu (fixed) */}
      <aside
        className={`hidden md:flex h-screen bg-blue-500 text-white flex-col justify-between transition-all duration-300 md:fixed md:inset-y-0 md:left-0 md:z-40 ${
          isCollapsed ? "md:w-20" : "md:w-64"
        }`}
      >
      {/* TOPO */}
      <div className="p-4 flex items-center justify-between border-b border-blue-700">
        {!isCollapsed && (
          <img
            src="/toolbox-svgrepo-com.svg"
            alt="Logo"
            className="w-8 h-8"
          />
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:text-gray-200 cursor-pointer"
        >
          {isCollapsed ? <MdMenu size={24} /> : <MdClose size={24} />}
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        <ul className="space-y-3">

          {/* === INÍCIO === */}
          <li>
            <NavLink
              to="/inventario"
              className={({ isActive }) =>
                `flex items-center gap-3 text-base transition relative
                ${isActive ? "text-white font-semibold" : "text-gray-200 hover:text-white"}
              `
              }
            >
              <MdDashboard size={20} />
              {!isCollapsed && <span>Início</span>}
            </NavLink>
          </li>

          {/* === MOVIMENTAÇÃO === */}
          <li>
            <NavLink
              to="/movimentacao"
              className={({ isActive }) =>
                `flex items-center gap-3 text-base transition relative
                ${isActive ? "text-white font-semibold" : "text-gray-200 hover:text-white"}
              `
              }
            >
              <FaListAlt size={18} />
              {!isCollapsed && <span>Movimentação</span>}
            </NavLink>
          </li>

          {/* === REGISTRAR === */}
          <li>
            <NavLink
              to="/registrar"
              className={({ isActive }) =>
                `flex items-center gap-3 text-base transition
                ${isActive ? "text-white font-semibold" : "text-gray-200 hover:text-white"}
              `
              }
            >
              <FaUserPlus size={18} />
              {!isCollapsed && <span>Registrar</span>}
            </NavLink>
          </li>

          {/* === MEUS DADOS === */}
          <li>
            <NavLink
              to="/meusDados"
              className={({ isActive }) =>
                `flex items-center gap-3 text-base transition
                ${isActive ? "text-white font-semibold" : "text-gray-200 hover:text-white"}
              `
              }
            >
              <FaCalendarCheck size={18} />
              {!isCollapsed && <span>Meus Dados</span>}
            </NavLink>
          </li>

        </ul>
      </nav>

      {/* SAIR */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-300 hover:text-red-500 w-full"
        >
          <MdExitToApp size={20} />
          {!isCollapsed && <span>Sair</span>}
        </button>
      </div>
      </aside>

      {/* Mobile overlay menu */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-blue-500 text-white flex flex-col justify-between md:hidden">
            <div className="p-4 flex items-center justify-between border-b border-blue-700">
              <img src="/toolbox-svgrepo-com.svg" alt="Logo" className="w-8 h-8" />
              <button
                onClick={() => setIsMobileOpen(false)}
                className="text-white hover:text-gray-200 cursor-pointer"
                aria-label="Close Menu"
              >
                <MdClose size={24} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
              <ul className="space-y-3">
                <li>
                  <NavLink
                    to="/inventario"
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-base transition relative ${
                        isActive ? "text-white font-semibold" : "text-gray-200 hover:text-white"
                      }`
                    }
                  >
                    <MdDashboard size={20} />
                    <span>Início</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/movimentacao"
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-base transition relative ${
                        isActive ? "text-white font-semibold" : "text-gray-200 hover:text-white"
                      }`
                    }
                  >
                    <FaListAlt size={18} />
                    <span>Movimentação</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/registrar"
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-base transition relative ${
                        isActive ? "text-white font-semibold" : "text-gray-200 hover:text-white"
                      }`
                    }
                  >
                    <FaUserPlus size={18} />
                    <span>Registrar</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/meusDados"
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-base transition relative ${
                        isActive ? "text-white font-semibold" : "text-gray-200 hover:text-white"
                      }`
                    }
                  >
                    <FaCalendarCheck size={18} />
                    <span>Meus Dados</span>
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="p-4 border-t border-blue-700">
              <button
                onClick={() => { setIsMobileOpen(false); handleLogout(); }}
                className="flex items-center gap-3 text-red-300 hover:text-red-500 w-full"
              >
                <MdExitToApp size={20} />
                <span>Sair</span>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default SideMenu;
