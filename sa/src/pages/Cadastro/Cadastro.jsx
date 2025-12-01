import React, { use, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setSenha(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const isPasswordValid = () => senha.length >= 8 && senha === confirmPassword;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid()) {
      setIsPasswordMatch(false);
      return;
    }

    setIsSaving(true);

    try {
      // Prevent registering the same email several times
      const existing = await axios.get('http://localhost:3001/usuarios', { params: { email } });
      if (existing.data.length > 0) {
        toast.error('Email já cadastrado. Use outro email ou faça login.', { autoClose: 2000, hideProgressBar: true });
        setIsSaving(false);
        return;
      }
      await axios.post('http://localhost:3001/usuarios', { email, senha });

      setIsSaving(false);
      toast.success('Usuário criado com sucesso!', {
        // position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        onClose: () => navigate('/'),
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      toast.error('Erro ao criar o usuário!', {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
      });
      setIsSaving(false);
    }
  };

  return (
    <section className=" h-screen p-6 bg-white rounded-xl shadow-lg flex flex-col justify-center items-center">
      <div className='bg-blue-500 w-100 p-10 rounded-2xl shadow-lg text-white'>

      <h2 className="text-2xl font-bold mb-6 text-center">Criar Usuário</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="senha" className="block text-sm font-medium mb-1">Senha:</label>
          <input
            type="senha"
            id="senha"
            value={senha}
            onChange={handlePasswordChange}
            required
            minLength={8}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirmar Senha:</label>
          <input
            type="senha"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!isPasswordMatch && (
            <p className="text-red-500 text-sm mt-1">As senhas não correspondem.</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSaving}
            className={`w-full p-2 rounded-lg text-white ${
              isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              } transition-colors`}
              >
            {isSaving ? 'Salvando...' : 'Criar Usuário'}
          </button>
        </div>
      </form>
      <ToastContainer />
            </div>
    </section>
  );
};

export default Cadastro;
