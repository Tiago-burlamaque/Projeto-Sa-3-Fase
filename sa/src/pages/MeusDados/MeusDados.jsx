import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

function MeusDados() {
  const { token } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const controller = new AbortController();

    const carregarUsuario = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        setUsuario(data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Erro ao buscar usuário:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    carregarUsuario();
    return () => controller.abort();
  }, [token]);

  if (loading) {
    return (
      <section className="bg-white min-h-screen flex justify-center items-center">
        <p className="text-blue-500 text-xl">Carregando seus dados...</p>
      </section>
    );
  }

  if (!usuario) {
    return (
      <section className="bg-white min-h-screen flex justify-center items-center">
        <p className="text-red-500 text-xl">Não foi possível carregar seus dados.</p>
      </section>
    );
  }

  const endereco = usuario.endereco || {};

  return (
    <section className="bg-white min-h-screen py-8 flex justify-center items-center">
      <div className="md:max-w-4xl mx-auto p-4">
        <div className="bg-blue-500 rounded-xl p-6 flex flex-col gap-4">

          {/* Boas-vindas */}
          <nav className="bg-blue-400 rounded-lg p-4 text-white text-center text-2xl">
            <h1>Seja bem-vindo, {usuario.nome}</h1>
          </nav>

          {/* Título */}
          <nav className="bg-blue-400 rounded-lg p-4 text-white text-center text-2xl">
            <h1>Seus Dados</h1>
          </nav>

          {/* Blocos de Dados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Dados Pessoais */}
            <nav className="bg-blue-400 shadow-md rounded-lg p-4 text-white flex flex-col gap-2">
              <span><strong>Nome:</strong> {usuario.nome}</span>
              <span><strong>Email:</strong> {usuario.email}</span>
              <span><strong>Data de Nascimento:</strong> {usuario.data_nascimento}</span>
              <span><strong>CPF:</strong> {usuario.cpf}</span>
              <span><strong>RG:</strong> {usuario.rg}</span>
              <span><strong>Telefone:</strong> {usuario.telefone}</span>
            </nav>

            {/* Endereço */}
            <nav className="bg-blue-400 shadow-md rounded-lg p-4 text-white flex flex-col gap-2">
              <span><strong>CEP:</strong> {endereco.cep || "-"}</span>
              <span><strong>Rua:</strong> {endereco.logradouro || "-"}</span>
              <span><strong>Número:</strong> {endereco.numero || "-"}</span>
              <span><strong>Bairro:</strong> {endereco.bairro || "-"}</span>
              <span><strong>Cidade:</strong> {endereco.cidade || "-"}</span>
              <span><strong>Estado:</strong> {endereco.estado || "-"}</span>
              <span><strong>Complemento:</strong> {endereco.complemento || "-"}</span>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MeusDados;
