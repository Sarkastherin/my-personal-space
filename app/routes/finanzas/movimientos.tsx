import type { Route } from "../+types/home";
import { MainContainer } from "~/components/Containers";
import { FaCashRegister } from "react-icons/fa6";
import { EntityTable } from "~/components/EntityTable";
import {
  Input,
  SelectInput,
  CurrencyInput,
  ToggleCheckbox,
} from "~/components/InputsForms";
import { useForm } from "react-hook-form";
import type { MovimientosBD } from "~/types/finanzas";
import {
  tipoMovimientosOpt,
  categoriasOpt,
  formasDePagoOpt,
} from "~/types/finanzas";
import { movimientosService } from "~/backend/services";
import { FooterForm } from "~/components/FooterForm";
import { useUIModals } from "~/context/ModalsContext";
import { useData } from "~/context/DataContext";
import { useEffect } from "react";
import { Spinning } from "~/components/Spinning";
import type { TableColumn } from "react-data-table-component";
import { Badge } from "flowbite-react";
import { capitalize, formatDateUStoES } from "~/utils/functions";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movimientos" },
    { name: "description", content: "Crea movimientos financieros aquí." },
  ];
}
const columns: TableColumn<MovimientosBD>[] = [
  {
    name: "Fecha",
    selector: (row) => formatDateUStoES(row.fecha_movimiento),
    sortable: true,
    width: "130px",
  },
  {
    name: "Tipo",
    cell: (row) => (
      <Badge color={row.tipo === "ingreso" ? "green" : "red"}>
        {capitalize(row.tipo)}
      </Badge>
    ),
    sortable: true,
    width: "120px",
  },
  {
    name: "Categoría",
    selector: (row) => capitalize(row.categoria),
    sortable: true,
    width: "170px",
  },

  {
    name: "Concepto",
    selector: (row) => row.concepto || "-",
    sortable: true,
  },
  {
    name: "Monto",
    selector: (row) =>
      row.monto.toLocaleString("es-AR", { style: "currency", currency: "ARS" }),
    sortable: true,
    width: "150px",
  },
];
export default function Movimientos() {
  const { movimientos, getMovimientos } = useData();

  useEffect(() => {
    if (!movimientos) getMovimientos();
  }, []);

  return (
    <MainContainer>
      <div className="inline-flex items-center gap-4 text-lime-600 dark:text-lime-400 mb-6">
        <span className="bg-lime-200 dark:bg-lime-800/40 p-3 rounded-full">
          <FaCashRegister className="size-5" />
        </span>
        <h2 className="text-2xl font-bold">Movimientos</h2>
      </div>
      {movimientos ? (
        <EntityTable data={movimientos} columns={columns} />
      ) : (
        <div className="flex flex-col items-center justify-center py-6 gap-4">
          <Spinning />
          <p className="text-zinc-700 dark:text-zinc-300 text-center max-w-xs">
            Cargando movimientos
          </p>
        </div>
      )}
    </MainContainer>
  );
}
