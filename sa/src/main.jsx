import './index.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "@radix-ui/themes/styles.css";



import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import Inventario from './pages/Home/Inventario';
import { AuthProvider } from './Context/AuthContext';
import RegistrarItem from './pages/RegistrarItem/RegistrarItem';
import Movimentacao from './pages/Movimentacao/Movimentacao';
import MeusDados from './pages/MeusDados/MeusDados';
import Main from './Layout/Main/Main';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


const router = createBrowserRouter([
  { path: "/cadastro", element: <Cadastro />},
  { path: "/", element: <Login /> },
  
  {
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      { path: "/inventario", element: <Inventario /> },
      { path: "/movimentacao", element: <Movimentacao/> },
      { path: "/registrar", element: <RegistrarItem/>},
      { path: "/MeusDados", element: <MeusDados/> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)

