import type { Route } from "../+types/home";
import { MainContainer } from "~/components/Containers";
import { FaCashRegister } from "react-icons/fa6";
import { EntityTable } from "~/components/EntityTable";
import type { CategoriasBD, MovimientosBD } from "~/types/finanzas";
import { movimientosService } from "~/backend/services";
import { useUIModals } from "~/context/ModalsContext";
import { useData } from "~/context/DataContext";
import { useEffect } from "react";
import { Spinning } from "~/components/Spinning";
import type { TableColumn } from "react-data-table-component";
import { Badge } from "flowbite-react";
import { capitalize, formatDateUStoES } from "~/utils/functions";
import { Button } from "~/components/Buttons";
import ModalMovimientos from "~/components/modals/customs/ModalMovimiento";
import { FiTrash2 } from "react-icons/fi";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movimientos" },
    { name: "description", content: "Crea movimientos financieros aquí." },
  ];
}
const columns = (
  categorias: CategoriasBD[],
  onDelete: (row: MovimientosBD) => void
): TableColumn<MovimientosBD>[] => {
  return [
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
      selector: (row) =>
        categorias.find((cat) => cat.nombre === row.categoria)
          ?.nombre_con_emoji || "-",
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
        row.monto.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        }),
      sortable: true,
      width: "150px",
    },
    {
      name: "🗑️",
      cell: (row: MovimientosBD) => (
        <Button
          variant="red"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row);
          }}
        >
          <FiTrash2 />
        </Button>
      ),
      width: "70px",
    },
  ];
};
export default function Movimientos() {
  const { movimientos, getMovimientos, categorias, getCategorias } = useData();
  const { openModal } = useUIModals();

  useEffect(() => {
    if (!movimientos) getMovimientos();
    if (!categorias) getCategorias();
  }, []);
  const handleOpenModal = () => {
    openModal("CUSTOM", {
      component: ModalMovimientos,
      props: {
        type: "new",
      },
    });
  };
  const handleOnRowClick = (row: MovimientosBD) => {
    openModal("CUSTOM", {
      component: ModalMovimientos,
      props: {
        type: "edit",
        data: row,
      },
    });
  };
  const handleDelete = (row: MovimientosBD) => {
    openModal("CONFIRMATION", {
      message: `¿Estás seguro de que deseas eliminar el movimiento de ${row.monto.toLocaleString(
        "es-AR",
        {
          style: "currency",
          currency: "ARS",
        }
      )}?`,
      onConfirm: async () => {
        try {
          openModal("LOADING", { message: "Eliminando movimiento..." });
          const res = await movimientosService.delete(row.id);
          if (!res.success)
            throw new Error(
              typeof res.error === "string"
                ? res.error
                : JSON.stringify(res.error)
            );
          await getMovimientos();
          openModal("SUCCESS", { message: "Movimiento eliminado con éxito" });
        } catch (error) {
          console.log("Error deleting movimiento:", error);
          openModal("ERROR", { message: "Error al eliminar el movimiento" });
        }
      },
    });
  };
  return (
    <MainContainer>
      <div className="flex justify-between text-lime-600 dark:text-lime-500 mb-6">
        <div className="flex items-center gap-2">
          <span className="bg-lime-200 dark:bg-lime-800/40 p-3 rounded-full">
            <FaCashRegister className="size-5" />
          </span>
          <h2 className="text-2xl font-bold">Movimientos</h2>
        </div>
        <div>
          <Button variant="lime" type="button" onClick={handleOpenModal}>
            + Nuevo Movimiento
          </Button>
        </div>
      </div>
      {movimientos && categorias ? (
        <EntityTable
          data={movimientos}
          columns={columns(categorias, handleDelete)}
          onRowClick={handleOnRowClick}
          filterFields={[
            {
              key: "concepto",
              label: "Concepto",
              autoFilter: true,
            },
            {
              key: "categoria",
              label: "Categoría",
              type: "select",
              options: (
                <>
                  <option value="">Todas</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.nombre}>
                      {cat.nombre_con_emoji}
                    </option>
                  ))}
                </>
              ),
              autoFilter: true,
            },
            {
              key: "tipo",
              label: "Tipo",
              type: "select",
              options: (
                <>
                  <option value="">Todos</option>
                  <option value="ingreso">💰 Ingreso</option>
                  <option value="gasto">💸 Gasto</option>
                </>
              ),
              autoFilter: true,
            },
            //{key: "periodo", label: "Desde", type: "dateRange", autoFilter: true},
          ]}
        />
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
