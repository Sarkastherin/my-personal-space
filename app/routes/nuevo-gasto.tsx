import type { Route } from "./+types/home";
import { MainContainer } from "~/components/Containers";
import MovimientosForm from "~/components/forms/MovimientosForm";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nuevo Gasto" },
    { name: "description", content: "Nuevo Gasto" },
  ];
}

export default function NuevoGasto() {
  const [message, setMessage] = useState({
    successMessage: "",
    errorMessage: "",
    isLoading: false,
  });

  return (
    <MainContainer justifyContent="justify-center" alignItems="items-center">
      <div className="w-md">
        <MovimientosForm
          type="new"
          tipo_movimiento="gasto"
          setMessage={setMessage}
        />
      </div>
    </MainContainer>
  );
}
