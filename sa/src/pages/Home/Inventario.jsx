import React, { useState } from 'react'
import SideMenu from '../../components/SideMenu/SideMenu'

function Inventario() {
  const [inventario, setInventario] = useState([])

  const fetchInventario = async () => {
    try{
      const response = await axios.get('http://localhost:3000/inventario')
      setInventario(response.data)
    } catch(error) {
      console.error(`Erro ao buscar item: ${error}`)
    }
  }
  return (
    <div className="flex h-screen">


    <SideMenu />
      {/* Conteúdo */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
    
        <div className="flex gap-6">
          
          
          
        </div>
     
        
      </div>
    </div>
  )
}

export default Inventario
