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
    <section className='bg-white min-h-screen py-8 justify-center items-center  flex'>
      <div className='md:max-w-4xl mx-auto p-4'>
        <div className='bg-blue-500 rounded-xl p-6 flex flex-col'>
          <div>
            {meuUsuario ? (
              <section key={meuUsuario.id} className='gap-4 flex flex-col'>
                <nav className='bg-blue-400 shadow-md rounded-lg p-4 text-white text-center flex justify-center items-center text-2xl'>
                  <h1>Seja bem vindo {meuUsuario.nome || "-"}</h1>
                  {/* <p>Nome: {meuUsuario.nome || "-"}</p>
              <p>Email: {meuUsuario.email}</p> */}
                  {/* Avoid showing password in UI for security reasons */}
                </nav>

                <nav className='bg-blue-400 shadow-md rounded-lg p-4 text-white text-center flex justify-center items-center text-2xl'>
                  <h1>Seus Dados</h1>
                </nav>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                  <nav className='bg-blue-400 shadow-md rounded-lg p-4 text-white text-left flex flex-col gap-2'>
                    <span className='w-full'>Nome: {meuUsuario.nome || '-'}</span>
                    <span className='w-full'>E-mail: {meuUsuario.email}</span>
                    <span className='w-full'>Data de Nascimento: {meuUsuario.data_nascimento}</span>
                    {/* Avoid showing password in UI for security reasons */}
                    <span className='w-full'>CPF: {meuUsuario.cpf}</span>
                    <span className='w-full'>RG: {meuUsuario.rg}</span>
                    <span className='w-full'>Telefone: {meuUsuario.telefone}</span>
                  </nav>
                  <nav className='bg-blue-400 shadow-md rounded-lg p-4 text-white text-left flex flex-col gap-2'>
                    <span>CEP: {meuUsuario.endereco?.cep || '-'}</span>
                    <span>Rua: {meuUsuario.endereco?.logradouro || '-'}</span>
                    <span>Número: {meuUsuario.endereco?.numero || '-'}</span>
                    <span>Bairro: {meuUsuario.endereco?.bairro || '-'}</span>
                    <span>Cidade: {meuUsuario.endereco?.cidade || '-'}</span>
                    <span>Estado: {meuUsuario.endereco?.estado || '-'}</span>
                    <span>Complemento: {meuUsuario.endereco?.complemento || '-'}</span>
                  </nav>
                </div>
              </section>
            ) : (
              <p>Carregando seus dados...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MeusDados;
