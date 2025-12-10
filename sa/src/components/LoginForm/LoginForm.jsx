import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/inventario");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password: password,  // <-- AQUI ESTÁ A CORREÇÃO
      });

      console.log("Resposta do backend", response.data);

      const { accessToken, user: userData } = response.data;

      if (!accessToken) {
        toast.error("Token não recebido do servidor.");
        setLoading(false);
        return;
      }

      // Salva no contexto
      login(userData, accessToken);

      toast.success("Login realizado com sucesso!", { autoClose: 1500 });

      setTimeout(() => navigate("/inventario"), 1500);
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      if (error.response?.status === 401) {
        toast.error("Credenciais inválidas!", { autoClose: 2000 });
      } else {
        toast.error("Erro ao conectar ao servidor.", { autoClose: 2000 });
      }
    }

    setLoading(false);
  };

  return (
    <section className="h-screen md:w-2xl">
      <form
        onSubmit={handleLogin}
        className="bg-white h-screen flex flex-col justify-center items-center"
      >
        <div className="md:w-md">
          <h1 className="text-center mb-10 font-sans text-3xl">Bem-vindo(a)</h1>

          <div>
            <div className="flex flex-col justify-center items-center mb-2">
              <input
                type="email"
                id="email"
                className="border border-gray-400 rounded p-2 w-xs md:w-md focus:outline-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col justify-center items-center mb-2">
              <input
                type="password"
                id="senha"
                className="border border-gray-400 rounded p-2 w-xs md:w-md focus:outline-blue-500"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="justify-center items-center text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white md:w-md w-xs rounded p-2 cursor-pointer transition hover:bg-blue-600 ${loading ? "opacity-60" : ""
                }`}
            >
              {loading ? "Entrando..." : "Logar"}
            </button>
          </div>

          <div className="flex text-center justify-center">
            <p className="text-base mt-2 mr-2">Não tem uma conta?</p>
            <p className="relative text-blue-500 hover:text-blue-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 text-base mt-2">
              <Link to="cadastro">Cadastre-se</Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
