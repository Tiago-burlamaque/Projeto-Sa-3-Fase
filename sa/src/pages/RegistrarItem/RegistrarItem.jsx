

import React from 'react'

function FormCard({ title, children, onSubmit, className = '' }) {
  return (
    <div className={`bg-blue-500 my-4 mx-2 rounded-lg p-4 flex flex-col justify-center items-center shadow ${className}`}>
      <h2 className="text-white text-lg font-semibold mb-2">{title}</h2>
      <form onSubmit={onSubmit} className="w-full max-w-4xl">
        {children}
      </form>
    </div>
  )
}

function RegistrarItem() {
  return (
    <section className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inventário */}
          <FormCard title="Registrar Inventário" className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
              <div className="flex flex-col">
                <label htmlFor="nomeDoItem">Nome do item</label>
                <input id="nomeDoItem" name="nomeDoItem" type="text" placeholder="Nome do item" className="bg-white w-full rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="patrimonio">Patrimônio</label>
                <input id="patrimonio" name="patrimonio" type="text" placeholder="Patrimônio" className="bg-white w-full rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="quantidadeInventario">Quantidade</label>
                <input id="quantidadeInventario" name="quantidadeInventario" type="number" placeholder="Quantidade" className="bg-white w-full rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="precoUnitario">Preço unitário</label>
                <input id="precoUnitario" name="precoUnitario" type="text" placeholder="Preço unitário" className="bg-white w-full rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="precoTotal">Preço total</label>
                <input id="precoTotal" name="precoTotal" type="text" placeholder="Preço Total" className="bg-white w-full rounded p-2" />
              </div>
              <div className="col-span-full flex justify-end">
                <button type="submit" className="bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-600 transition hover:shadow-2xl w-full sm:w-auto sm:px-6 py-2">Registrar inventário</button>
              </div>
            </div>
          </FormCard>

          {/* Movimentação */}
          <FormCard title="Registrar Movimentação">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
              <div className="flex flex-col">
                <label htmlFor="data">Data</label>
                <input id="data" name="data" type="date" className="bg-white w-full rounded p-2 text-black" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="tipoDaMovimentacao">Tipo da movimentação</label>
                <select id="tipoDaMovimentacao" name="tipoDaMovimentacao" className="bg-white w-full rounded p-2 text-black">
                  <option value="">Selecione</option>
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="nomeDoCliente">Nome do cliente</label>
                <input id="nomeDoCliente" name="nomeDoCliente" type="text" className="bg-white w-full rounded p-2 text-black" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="nomeDoItemMov">Nome do item</label>
                <input id="nomeDoItemMov" name="nomeDoItemMov" type="text" className="bg-white w-full rounded p-2 text-black" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="quantidadeMov">Quantidade</label>
                <input id="quantidadeMov" name="quantidadeMov" type="number" className="bg-white w-full rounded p-2 text-black" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="custoTotal">Custo total</label>
                <input id="custoTotal" name="custoTotal" type="number" className="bg-white w-full rounded p-2 text-black" />
              </div>
              <div className="col-span-full flex justify-end">
                <button type="submit" className="bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-600 transition hover:shadow-2xl w-full sm:w-auto sm:px-6 py-2">Registrar movimentação</button>
              </div>
            </div>
          </FormCard>
        </div>
      </div>
    </section>
  )
}

export default RegistrarItem
