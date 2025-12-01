import { Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useState } from 'react'

const Main = () => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
      <div className="flex min-h-screen bg-gray-100 relative">
      {/* Barra lateral fixa */}
        <SideMenu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      

      {/* Conteúdo principal */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'md:pl-20' : 'md:pl-64'}`}>

        {/* Aqui entram as páginas internas do dashboard */}
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};
export default Main;
