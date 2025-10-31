import React, { useState } from 'react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  return (
   <div className='flex flex-col justify-center items-center h-screen bg-blue-800'>
  <div className="flex flex-col border-none justify-center items-center text-center w-120 h-130 rounded-xl bg-cyan-100 shadow-2xl text-xl ">
    <h1 className='font-bold text-3xl'>Bem vindo(a)</h1>
    <form action="">
      <div className='gap-2 flex flex-col'>
        <input 
          type="email"
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='border w-70 p-1'
        />    
        <input 
          type="password"
          id='senha'
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder='Senha'
          className='border'
        />
      </div>
    </form>
  </div>
</div>

  )
}

export default LoginForm
