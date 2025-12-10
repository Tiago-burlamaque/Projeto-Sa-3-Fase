import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "@radix-ui/themes";

function Inventario() {
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/inventario/itens")
      .then((res) => setInventario(res.data))
      .catch((err) => console.error("Erro ao buscar itens:", err));
  }, []);

  return (
    <div className="p-4 space-y-4">

      {/* MOBILE – Cards */}
      <div className="md:hidden space-y-4">
        {inventario.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-4 space-y-2"
          >
            <div className="flex justify-between text-sm text-gray-500">
              <span>ID #{item.id}</span>
              <span>Estoque: {item.estoque}</span>
            </div>

            <div className="font-semibold text-lg">
              {item.nome_item}
            </div>

            <div className="text-sm">
              Patrimônio: {item.patrimonio}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">
                R$ {item.preco_unitario}
              </span>
              <span className="font-bold">
                R$ {item.preco_total}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP – Tabela */}
      <div className="hidden md:block">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Estoque</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Patrimônio</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Custo Unitário</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Custo Total</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {inventario.map((item) => (
              <Table.Row key={item.id}>
                <Table.RowHeaderCell>{item.id}</Table.RowHeaderCell>
                <Table.Cell>{item.nome_item}</Table.Cell>
                <Table.Cell>{item.estoque}</Table.Cell>
                <Table.Cell>{item.patrimonio}</Table.Cell>
                <Table.Cell>{item.preco_unitario}</Table.Cell>
                <Table.Cell>{item.preco_total}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}

export default Inventario;
