import { Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useState } from "react";

const Main = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* SideMenu fixa */}
      <SideMenu
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Conteúdo principal */}
      <main
        className={`
          transition-all duration-300
          pt-20 px-4
          md:pt-4
          ${isCollapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
