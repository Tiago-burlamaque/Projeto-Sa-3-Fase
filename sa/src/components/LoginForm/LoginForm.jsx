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
      <div className='flex flex-col h-screen justify-center items-center ml-15'>
      <div className='flex flex-col  justify-center items-center  w-120 h-130 rounded-xl bg-white  text-xl'>
        <form className='flex flex-col'>
          <div className='flex flex-col gap-4'>

          <div className='flex flex-col gap-0'>
          <label htmlFor="email">Email</label>
          <input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='rounded outline-blue-500  shadow-xl' />
          </div>

          <div className='flex flex-col gap-0'>
          <label htmlFor="senha">Senha</label>
          <input type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className='rounded outline-blue-500  shadow-xl' />
          </div>

          <button onSubmit={handleLogin} className='bg-blue-500 text-white w-70 p-2 rounded-xl transition hover:bg-blue-700 cursor-pointer'>Logar</button>
          </div>
        </form>
        <div className='flex'>

         <p  className='text-base mt-2 mr-2'>Não tem uma conta?</p> 
     <p className='relative text-blue-500 hover:text-blue-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 text-base mt-2'><Link to='cadastro'>Cadastre-se</Link></p>
      </div>    
        </div>
    </div>
//    <div className='flex flex-col justify-center items-center h-screen bg-blue-800'>
//   <div className="flex flex-col border-none justify-center items-center text-center w-120 h-130 rounded-xl bg-white shadow-2xl text-xl">
//     <h1 className='font-bold text-3xl'>Bem vindo(a)</h1>
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
