import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "@radix-ui/themes";

function Movimentacao() {
  const [movimentacoes, setMovimentacoes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/mov/movimentacao")
      .then((res) => setMovimentacoes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 space-y-4">

      {/* ✅ MOBILE – CARDS */}
      <div className="md:hidden space-y-4">
        {movimentacoes.map((mov) => (
          <div
            key={mov.id}
            className="bg-white rounded-xl shadow p-4 space-y-2"
          >
            <div className="flex justify-between text-sm text-gray-500">
              <span>ID #{mov.id}</span>
              <span>{mov.data_movimento}</span>
            </div>

            <div className="font-semibold">{mov.item}</div>

            <div className="text-sm">
              <strong>Cliente:</strong> {mov.nome_cliente}
            </div>

            <div className="flex justify-between text-sm">
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
                {mov.tipo_movimento}
              </span>
              <span>Qtd: {mov.quantidade}</span>
            </div>

            <div className="text-right font-bold">
              R$ {mov.custo_total}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ DESKTOP – TABELA */}
      <div className="hidden md:block">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Data</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Tipo</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Cliente</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Qtd</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Custo Total</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {movimentacoes.map((mov) => (
              <Table.Row key={mov.id}>
                <Table.RowHeaderCell>{mov.id}</Table.RowHeaderCell>
                <Table.Cell>{mov.data_movimento}</Table.Cell>
                <Table.Cell>{mov.tipo_movimento}</Table.Cell>
                <Table.Cell>{mov.nome_cliente}</Table.Cell>
                <Table.Cell>{mov.item}</Table.Cell>
                <Table.Cell>{mov.quantidade}</Table.Cell>
                <Table.Cell>{mov.custo_total}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}

export default Movimentacao;
