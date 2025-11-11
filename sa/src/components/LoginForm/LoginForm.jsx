import React, { useState } from 'react'
import { Link, useNavigate } from "react-router";
import { toast } from 'react-toastify';

function LoginForm() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const navigate = useNavigate()

  const handleLogin = () => {
    e.preventDefault()

  }

  return (

    <section className='bg-red-500 h-screen w-2xl'>
      <form className='bg-cyan-500 h-screen flex flex-col justify-center items-center gap'>
        <div className='bg-green-500 w-md'>
          <div className='bg-pink-500'>

            <div className='flex flex-col justify-center items-center'>
              {/* <label htmlFor="email" id='email'>Email</label> */}
              <input type="email"
                id='email'
                className='border border-gray-400 rounded p-1 w-xs' />
            </div>

            <div className='flex flex-col justify-center items-center'>
              {/* <label htmlFor="senha" id='senha'>Senha</label> */}
              <input type="senha"
                id='senha'
                className='border border-gray-400 rounded p-1 w-xs' />
            </div>
          </div>

          <div className='justify-center items-center text-center border mt-4'>
            <button>Logar</button>
          </div>

        </div>

      </form>
    </section>
    //    <div className='flex justify-center items-center h-screen bg-blue-800'>
    //   <div className="flex flex-col border-none justify-center items-center text-center w-120 h-130 rounded-xl bg-white shadow-2xl text-xl">
    //     <h1 className='font-bold text-3xl mb-10'>Bem-vindo(a)</h1>
    //     <form action="" onSubmit={handleLogin}>
    //       <div className='flex flex-col gap-4'>
    //         <input 
    //           type="email"
    //           id='email'
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder='Email'
    //           className='w-70 p-2 rounded outline-blue-500  shadow-xl '
    //         />    
    //         <input 
    //           type="password"
    //           id='senha'
    //           value={senha}
    //           onChange={(e) => setSenha(e.target.value)}
    //           placeholder='Senha'
    //           minLength={8}
    //           className='w-70 p-2 rounded outline-blue-500  shadow-xl '
    //         />
    //         <button onSubmit={handleLogin} className='bg-blue-500 text-white w-70 p-2 rounded-xl transition hover:bg-blue-700 cursor-pointer'>Logar</button>
    //       </div>
    //     </form>
    //     <div className='flex'>
    //     <p  className='text-base mt-2 mr-2'>Não tem uma conta?</p> 
    //     <p className='relative text-blue-500 hover:text-blue-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 text-base mt-2'><Link to='cadastro'>Cadastre-se</Link></p>
    //     </div>
    //   </div>
    // </div>

  )
}

export default LoginForm
