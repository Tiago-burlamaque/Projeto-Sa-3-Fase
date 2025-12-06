import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IMaskInput } from "react-imask";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ✅ COMPONENTE INPUT (corrige o erro) */
const Input = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`border rounded-lg p-2 w-full 
          focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
};

const Cadastro = () => {
  const navigate = useNavigate();

  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    data_nascimento: "",
    cpf: "",
    rg: "",
    telefone: "",
    address: {
      cep: "",
      cidade: "",
      estado: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      referencia: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const fetchAddressData = async (cep) => {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          rua: res.data.logradouro || "",
          bairro: res.data.bairro || "",
          cidade: res.data.localidade || "",
          estado: res.data.uf || "",
        },
      }));
    } catch {
      toast.error("Erro ao buscar CEP");
    }
  };

  const handleCepBlur = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) fetchAddressData(cep);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha.length < 8 || formData.senha !== confirmarSenha) {
      setIsPasswordMatch(false);
      toast.error("As senhas não correspondem");
      return;
    }

    setIsSaving(true);

    try {
      await axios.post("http://localhost:3001/usuarios", {
        ...formData,
        endereco: formData.address,
      });

      toast.success("Usuário criado!", {
        autoClose: 2000,
        onClose: () => navigate("/"),
      });
    } catch {
      toast.error("Erro ao criar usuário");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-2xl font-bold text-center mb-8">
          Criar Conta
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados pessoais */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Dados Pessoais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome" name="nome" value={formData.nome} onChange={handleInputChange} />
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
              <Input label="Senha" type="password" name="senha" value={formData.senha} onChange={handleInputChange} />
              <Input label="Confirmar senha" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
              <Input label="Data de nascimento" type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleInputChange} />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">CPF</label>
                <IMaskInput
                  mask="000.000.000-00"
                  value={formData.cpf}
                  onAccept={(v) => setFormData((p) => ({ ...p, cpf: v }))}
                  className="border rounded-lg p-2"
                />
              </div>

              <Input label="RG" name="rg" value={formData.rg} onChange={handleInputChange} />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Telefone</label>
                <IMaskInput
                  mask="(00) 00000-0000"
                  value={formData.telefone}
                  onAccept={(v) => setFormData((p) => ({ ...p, telefone: v }))}
                  className="border rounded-lg p-2"
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Endereço
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <IMaskInput
                mask="00000-000"
                value={formData.address.cep}
                onAccept={(v) =>
                  handleAddressChange({ target: { name: "cep", value: v } })
                }
                onBlur={handleCepBlur}
                className="border rounded-lg p-2"
                placeholder="CEP"
              />

              <Input label="Rua" name="rua" value={formData.address.rua} onChange={handleAddressChange} />
              <Input label="Número" name="numero" value={formData.address.numero} onChange={handleAddressChange} />
              <Input label="Bairro" name="bairro" value={formData.address.bairro} onChange={handleAddressChange} />
              <Input label="Cidade" name="cidade" value={formData.address.cidade} onChange={handleAddressChange} />
              <Input label="Estado" name="estado" value={formData.address.estado} onChange={handleAddressChange} />
            </div>
          </div>

          {!isPasswordMatch && (
            <p className="text-red-500 text-sm">
              As senhas não correspondem
            </p>
          )}

          <button
            disabled={isSaving}
            className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60 cursor-pointer"
          >
            {isSaving ? "Salvando..." : "Criar Usuário"}
          </button>
        </form>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Cadastro;
