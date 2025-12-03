import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react'

function Inventario() {

  const [inventario, setInventario] = useState([])

  const fetchInventario = async () => {
    try {
        const response = await axios.get('http://localhost:3000/inventario'); //usar o auth depois da verificação
        setInventario(response.data);
    } catch (error) {
        console.error('Erro ao buscar item:', error);
    }
  };

  useEffect(() => {
    fetchInventario();
  }, []);

  return (
    <div>
      <table className='w-full border-collapse'>
        <thead>
          <tr> 
            <th className='text-left p-1 border bg-white text-black'>ID</th> {/* criar um card no css para th e td */}
            <th className='text-left p-1 border bg-white text-black'>Nome</th>
            <th className='text-left p-1 border bg-white text-black'>Estoque</th>
            <th className='text-left p-1 border bg-white text-black'>N° Patrimônio</th>
            <th className='text-left p-1 border bg-white text-black'>Custo Unitário</th>
            <th className='text-left p-1 border bg-white text-black'>Custo Total</th>
            <th className='text-left p-1 border bg-white text-black'>Ações</th> {/* criar botoes para editar e deletar */}
          </tr>
        </thead>
        <tbody>
          {inventario.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.nome_item}</td>
              <td>{item.estoque}</td>
              <td>{item.patrimonio}</td>
              <td>{item.preco_unitario}</td>
              <td>{item.preco_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default Inventario
