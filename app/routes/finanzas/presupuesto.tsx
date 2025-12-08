import type { Route } from "../+types/home";
import { MainContainer } from "~/components/Containers";
import { TbReportMoney } from "react-icons/tb";
import { useUIModals } from "~/context/ModalsContext";
import { useData } from "~/context/DataContext";
import { Spinning } from "~/components/Spinning";
import { Button } from "~/components/Buttons";
import ModalMovimientos from "~/components/modals/customs/ModalMovimiento";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Input } from "~/components/InputsForms";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Presupuesto" },
    { name: "description", content: "Presupuesto financiero aquí." },
  ];
}
export default function Presupuesto() {
  const [periodo, setPeriodo] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const { presupuestos, getPresupuestos, categorias, getCategorias } =
    useData();
  const { openModal } = useUIModals();
  useEffect(() => {
    if (!categorias) getCategorias();
    if (!presupuestos) getPresupuestos();
  }, []);

  const handleOpenModal = () => {
    openModal("CUSTOM", {
      component: ModalMovimientos,
      props: {
        type: "new",
      },
    });
  };
  return (
    <MainContainer>
      <div className="flex justify-between text-cyan-600 dark:text-cyan-500 mb-6">
        <div className="flex items-center gap-2">
          <span className="bg-cyan-200 dark:bg-cyan-800/40 p-3 rounded-full">
            <TbReportMoney className="size-5" />
          </span>
          <h2 className="text-2xl font-bold">Presupuesto</h2>
        </div>
        <div className="flex gap-4">
          <div className="text-gray-700 dark:text-gray-300 flex items-center">
            <span className="font-medium">Periodo:</span>
            <input
              type="month"
              className="ms-2 p-2 border border-gray-300 rounded-md"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
            />
          </div>

          <Button variant="cyan" type="button" onClick={handleOpenModal}>
            Crear presupuesto
          </Button>
        </div>
      </div>
      <div className="mb-6 flex justify-center items-center sr-only">
        <span>Periodo:</span>
        <Input
          type="month"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
        />
      </div>
      {presupuestos ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-7xl gap-6 mx-auto">
          {categorias &&
            presupuestos.length > 0 &&
            categorias.map((cat) => (
              <Card
                key={cat.id}
                className="border-cyan-400/30 max-w-sm flex flex-col"
              >
                <h3 className="text-lg font-semibold">
                  {cat.nombre_con_emoji}
                </h3>
                <div className="text-gray-700 dark:text-gray-300 text-sm">
                  {presupuestos
                    .filter((pres) => pres.categoria === cat.nombre && pres.periodo === periodo)
                    .map((pres) => (
                      <div key={pres.id} className="flex gap-4 justify-between">
                        <span>{pres.concepto}</span>
                        <span>
                          {pres.monto_presupuestado.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })}
                        </span>
                      </div>
                    ))}
                </div>
                {/* Total del presupuesto por categoria */}
                <div className="pt-2 border-t border-gray-300 dark:border-gray-700 flex justify-between font-bold text-sm mt-auto">
                  <span>Total:</span>
                  <span>
                    {presupuestos
                      .filter((pres) => pres.categoria === cat.nombre && pres.periodo === periodo)
                      .reduce(
                        (total, pres) => total + pres.monto_presupuestado,
                        0
                      )
                      .toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                  </span>
                </div>
              </Card>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 gap-4">
          <Spinning />
          <p className="text-zinc-700 dark:text-zinc-300 text-center max-w-xs">
            Cargando presupuesto
          </p>
        </div>
      )}
    </MainContainer>
  );
}
