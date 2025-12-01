

function RegistrarItem() {
  return (
    <section className="flex-col bg-green-500 h-screen">
      <div className="h-screen bg-white flex flex-col">
        <div className="h-1/2 bg-blue-500 my-4 mx-4 rounded-lg justify-center items-center flex flex-col">
          <form className="grid grid-cols-3 gap-4 p-4">
            <div className="flex flex-col">
              <label htmlFor="nomeDoItem">Nome do item</label>
            <input type="text" placeholder="Nome do item" className="bg-white w-60 rounded p-2" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="patrimonio">Patrimônio</label>
            <input type="text" placeholder="Patrimônio" className="bg-white w-60 rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="quantidade">Quantidade</label>
            <input type="text" placeholder="Quantidade" className="bg-white w-60 rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="precoUnitario">Preço unitário</label>
            <input type="text" placeholder="Preço unitário" className="bg-white w-60 rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="PreçoTotal">Preço total</label>
            <input type="text" placeholder="Preço Total" className="bg-white w-60 rounded p-2" />
              </div>
            <button type="submit" className="bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-600 transition hover:shadow-2xl w-full p-2">Registrar inventário</button>
          </form>
        </div>
        <div className="h-1/2 bg-blue-500 my-4 mx-4 rounded-lg justify-center items-center flex flex-col">
          <div className="flex-col">
            <form className=" flex-col grid grid-cols-3 gap-4 p-4 text-white ">
              <div className="flex flex-col ">
                <label htmlFor="data">Data</label>
                <input type="date" name="data" id="data" className="bg-white w-60 rounded p-2 text-black " />
              </div>
              <div className="flex flex-col">
                <label htmlFor="tipoDaMovimentacao">Tipo da movimentação</label>
                <select name="" id="tipoDaMovimentacao" className="bg-white w-60 rounded p-2 text-black">
                  <option value="selecione">Selecione</option>
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="NomeDoCliente">Nome do cliente</label>
                <input type="text" name="NomeDoCliente" id="NomeDoCliente" className="bg-white w-60 rounded p-2 text-black" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="NomeDoItem">Nome do item</label>
                <input type="text" name="NomeDoItem" id="NomeDoItem" className="bg-white w-60 rounded p-2 text-black" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="quantidade">Quantidade</label>
                <input type="number" name="valorUnitario" id="valorUnitario" className="bg-white w-60 rounded p-2 text-black" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="custoTotal">Custo total</label>
                <input type="number" name="custoTotal" id="custoTotal" className="bg-white w-60 rounded p-2 text-black" />
              </div>

              <button type="submit" className="bg-blue-400 text-white rounded cursor-pointer hover:bg-blue-600 transition hover:shadow-2xl p-2">Registrar movimentação</button>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegistrarItem
