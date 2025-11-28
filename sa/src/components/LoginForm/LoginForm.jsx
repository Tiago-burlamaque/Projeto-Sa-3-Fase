import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import axios from 'axios'

function LoginForm() {
  const [usuarios, setUsuarios] = useState([])
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  })

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/usuarios")
        .then(data => console.log(data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUsuarios()
    // setUsuarios(response.data)
    //   .catch((error) => {
    //     console.error("Erro ao buscar usuários:", error)
    //   })
  }, [])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    try {
      
    } catch (error) {
      
    }
  }

  return (

    <section className='h-screen md:w-2xl'>
      <form onSubmit={handleLogin} className='bg-white h-screen flex flex-col justify-center items-center '>
        <div className=' md:w-md'>
          <h1 className=' text-center mb-10 font-sans text-3xl'>Bem-vindo(a)</h1>
          <div className=''>

            <div className='flex flex-col justify-center items-center mb-2'>
              {/* <label htmlFor="email" id='email'>Email</label> */}
              <input type="email"
                id='email'
                className='border border-gray-400 rounded p-2 w-xs md:w-md focus:outline-blue-500'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col justify-center items-center mb-2'>
              {/* <label htmlFor="senha" id='senha'>Senha</label> */}
              <input type="password"
                id='senha'
                className='border border-gray-400 rounded p-2 w-xs md:w-md focus:outline-blue-500'
                placeholder='Senha'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='justify-center items-center text-center mt-4'>
            <button className='bg-blue-500 text-white md:w-md w-xs rounded p-2 cursor-pointer transition hover:bg-blue-600' onSubmit={handleLogin}>Logar</button>
          </div>
          <div className="flex text-center justify-center">
            <p className='text-base mt-2 mr-2'>Não tem uma conta?</p>
            <p className='relative text-blue-500 hover:text-blue-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 text-base mt-2'><Link to='cadastro'>Cadastre-se</Link></p>
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
