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

const SideMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={`h-screen bg-blue-500 text-white flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
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
  );
};

export default SideMenu;
