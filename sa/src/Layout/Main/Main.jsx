import { Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import SideMenu from "../../components/SideMenu/SideMenu";

const Main = () => {
  const { user, logout } = useAuth();

  return (
       <div className="flex min-h-screen bg-gray-100">
      {/* Barra lateral fixa */}
      
        <SideMenu />
      

      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col">

        {/* Aqui entram as páginas internas do dashboard */}
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
};
export default Main;
