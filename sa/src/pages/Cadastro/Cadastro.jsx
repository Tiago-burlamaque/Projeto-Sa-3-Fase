import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'


function Cadastro() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    await axios.post('http://localhost:3000/usuarios', {
      email: email,
      senha: senha
    })
      .then(function (response) {
        console.log(response)
        toast.success('Usuário cadastrado', {
          delay:3000
        })
        navigate('')
      })
      .catch(function (error) {
        toast.error('Erro ao cadastrar usuário!')
        console.log(error)
      })
  }
  return (
    <div>
      <form onSubmit={handleRegister}>

        <input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} className='border' />
        <input type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)} className='border' />
        <button type='submit'>Cadastrar</button>
      </form>
    </div>
  )
}

export default Cadastro
