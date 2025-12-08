import ModalBase from "../ModalBase";
import MovimientosForm from "~/components/forms/MovimientosForm";
import type { MovimientosBD } from "~/types/finanzas";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";
import { useState } from "react";
export default function ModalMovimientos({
  onClose,
  data,
  type,
}: {
  onClose: () => void;
  data?: MovimientosBD;
  type: "new" | "edit";
}) {
  const [message, setMessage] = useState({
    successMessage: "",
    errorMessage: "",
    isLoading: false,
  });
  const { successMessage, errorMessage, isLoading } = message;

  return (
    <ModalBase
      title={type === "new" ? "Nuevo Movimiento" : "Editar Movimiento"}
      open={true}
      onClose={onClose}
      zIndex={100}
    >
      <div className="p-4">
        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
            <FaCheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Mensaje de error */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
            <IoIosAlert className="w-5 h-5" />
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}
        <MovimientosForm data={data} type={type} setMessage={setMessage} />
      </div>
    </ModalBase>
  );
}
