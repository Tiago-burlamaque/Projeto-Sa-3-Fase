import { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import axios from 'axios'

function MeusDados() {
  const { user } = useAuth()
  const [meuUsuario, setMeuUsuario] = useState(null)

  useEffect(() => {
    // React.StrictMode (development) mounts and unmounts components twice to help detect
    // side effects — that can cause network requests to run twice in dev.
    // We add an AbortController to cancel the request on unmount and to make the effect
    // safer (idempotent) across mounts.
    const controller = new AbortController();
    const fetchUsuario = async () => {
      try {
        if (!user?.email) return; // wait for user to be available
        const response = await axios.get("http://localhost:3001/usuarios", {
          params: { email: user.email },
          signal: controller.signal,
        });
        setMeuUsuario(response.data[0] || null);
      } catch (err) {
        // If the request was aborted, `err` will be an AbortError/CanceledError in modern fetch/axios
        // We ignore the cancellation, log other errors
        if (err.name === 'CanceledError' || err.message === 'canceled') return;
        console.error("Erro ao buscar usuários:", err);
      }
    };
    fetchUsuario();
    return () => controller.abort();
  }, [user]);
  return (
    <section className='bg-white h-screen flex justify-center items-center'>
      <div className='h-150 w-150  bg-blue-500 rounded-xl'>
        <div>
          {meuUsuario ? (
            <section key={meuUsuario.id} className=''>
              <nav className='h-30 bg-blue-400 shadow-md rounded-lg p-4 m-4 text-white text-center justify-center items-center flex text-2xl'>

              <h1>Seja bem vindo {meuUsuario.nome || "-"}</h1>
              {/* <p>Nome: {meuUsuario.nome || "-"}</p>
              <p>Email: {meuUsuario.email}</p> */}
              {/* Avoid showing password in UI for security reasons */}
              </nav>

              <nav className='h-30 bg-blue-400 shadow-md rounded-lg p-4 m-4 text-white text-center justify-center items-center flex text-2xl'>
                <h1>Seus Dados</h1>
              </nav>
              <div className='flex flex-row justify-center items-center'>

              <nav className='w-70 h-70 bg-blue-400 shadow-md rounded-lg p-4 m-4 text-white text-center justify-center items-center flex text-xl flex-col gap-2'>
                <span>Nome: {(meuUsuario.nome)}</span>
                <span>E-mail: {meuUsuario.email}</span>
                <span>Data de Nascimento: {meuUsuario.data_nascimento}</span>
                <span>Senha: {meuUsuario.senha}</span>
                <span>CPF: {meuUsuario.cpf}</span>
                <span>RG: {meuUsuario.rg}</span>
                <span>Telefone: {meuUsuario.telefone}</span>
              </nav>
              <nav className='w-70 h-70 bg-blue-400 shadow-md rounded-lg p-4 m-4 text-white text-center justify-center items-center flex text-xl flex-col gap-2'>
                <span>CEP: {meuUsuario.endereco.cep}</span>
                <span>Rua: {meuUsuario.endereco.logradouro}</span>
                <span>Número: {meuUsuario.endereco.numero}</span>
                <span>Bairro: {meuUsuario.endereco.bairro}</span>
                <span>Cidade: {meuUsuario.endereco.cidade}</span>
                <span>Estado: {meuUsuario.endereco.estado}</span>
                <span>Complemento: {meuUsuario.endereco.complemento}</span>
              </nav>
              </div>
            </section>
          ) : (
            <p>Carregando seus dados...</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default MeusDados;
