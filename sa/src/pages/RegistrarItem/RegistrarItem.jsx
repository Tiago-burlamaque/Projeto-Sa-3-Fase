import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

/* ---------- COMPONENTE INPUT ---------- */
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="border rounded p-2 focus:outline-blue-500 w-full"
      />
    </div>
  );
}

/* ---------- COMPONENTE PRINCIPAL ---------- */
function RegistrarItem() {
  const [isSaving, setIsSaving] = useState(false);

  const [formDataItem, setFormDataItem] = useState({
    nome_item: "",
    estoque: "",
    patrimonio: "",
    preco_unitario: "",
    preco_total: "",
  });

  const [formDataMov, setFormDataMov] = useState({
    data_movimento: "",
    tipo_movimento: "",
    nome_cliente: "",
    item: "",
    quantidade: "",
    custo_total: "",
  });

  /* ---------- HANDLERS ---------- */
  const handleChange = (setState) => (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- SUBMITS ---------- */
  const handleSubmitItem = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await axios.post("http://localhost:3001/inventario", formDataItem);
      toast.success("Item cadastrado com sucesso!");

      setFormDataItem({
        nome_item: "",
        estoque: "",
        patrimonio: "",
        preco_unitario: "",
        preco_total: "",
      });
    } catch {
      toast.error("Erro ao salvar o item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitMov = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/movimentacoes", formDataMov);
      toast.success("Movimentação registrada com sucesso!");

      setFormDataMov({
        data_movimento: "",
        tipo_movimento: "",
        nome_cliente: "",
        item: "",
        quantidade: "",
        custo_total: "",
      });
    } catch {
      toast.error("Erro ao salvar movimentação");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl space-y-6">

        {/* -------- INVENTÁRIO -------- */}
        <form
          onSubmit={handleSubmitItem}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Cadastro de Item</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Nome do item" name="nome_item" value={formDataItem.nome_item} onChange={handleChange(setFormDataItem)} />
            <Input label="Estoque" name="estoque" value={formDataItem.estoque} onChange={handleChange(setFormDataItem)} />
            <Input label="Patrimônio" type="number" name="patrimonio" value={formDataItem.patrimonio} onChange={handleChange(setFormDataItem)} />
            <Input label="Preço Unitário" type="number" name="preco_unitario" value={formDataItem.preco_unitario} onChange={handleChange(setFormDataItem)} />
            <Input label="Preço Total" type="number" name="preco_total" value={formDataItem.preco_total} onChange={handleChange(setFormDataItem)} />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="mt-6 w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {isSaving ? "Salvando..." : "Registrar Item"}
          </button>
        </form>

        {/* -------- MOVIMENTAÇÃO -------- */}
        <form
          onSubmit={handleSubmitMov}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Movimentação</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Data da Movimentação" type="date" name="data_movimento" value={formDataMov.data_movimento} onChange={handleChange(setFormDataMov)} />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Tipo</label>
              <select
                name="tipo_movimento"
                value={formDataMov.tipo_movimento}
                onChange={handleChange(setFormDataMov)}
                className="border rounded p-2 focus:outline-blue-500"
              >
                <option value="">Selecionar</option>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>

            <Input label="Nome do cliente" name="nome_cliente" value={formDataMov.nome_cliente} onChange={handleChange(setFormDataMov)} />
            <Input label="Item" name="item" value={formDataMov.item} onChange={handleChange(setFormDataMov)} />
            <Input label="Quantidade" type="number" name="quantidade" value={formDataMov.quantidade} onChange={handleChange(setFormDataMov)} />
            <Input label="Custo Total" type="number" name="custo_total" value={formDataMov.custo_total} onChange={handleChange(setFormDataMov)} />
          </div>

          <button
            type="submit"
            className="mt-6 w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Registrar Movimentação
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegistrarItem;
