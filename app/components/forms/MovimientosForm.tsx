import { useForm } from "react-hook-form";
import { useUIModals } from "~/context/ModalsContext";
import { movimientosService } from "~/backend/services";
import {
  SelectInput,
  CurrencyInput,
  Input,
  ToggleCheckbox,
} from "../InputsForms";
import {
  tipoMovimientosOpt,
  formasDePagoOpt,
  type MovimientosBD,
} from "~/types/finanzas";
import { prepareUpdatePayload } from "~/utils/functions";
import { Button } from "../Buttons";
import { useData } from "~/context/DataContext";
import { useEffect } from "react";
import { Spinning } from "../Spinning";
import { capitalize } from "~/utils/functions";
type MovimientosFormProps = {
  data?: MovimientosBD;
  type: "new" | "edit";
  tipo_movimiento?: "gasto" | "ingreso";
  setMessage: React.Dispatch<
    React.SetStateAction<{
      successMessage: string;
      errorMessage: string;
      isLoading: boolean;
    }>
  >;
};

export default function MovimientosForm({
  data,
  type,
  tipo_movimiento,
  setMessage,
}: MovimientosFormProps) {
  const { openModal, closeModal } = useUIModals();
  const { getMovimientos, getCategorias, categorias } = useData();
  useEffect(() => {
    if (!categorias) getCategorias();
  }, []);
  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful, dirtyFields },
    watch,
    setValue,
    reset,
    handleSubmit,
  } = useForm<MovimientosBD>({
    defaultValues: data || {
      tipo: tipo_movimiento || "",
      categoria: "",
      monto: 0,
      fecha_movimiento: new Date()
        .toLocaleDateString("es-PE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .reverse()
        .join("-"),
    },
  });
  const onSubmit = async (data: MovimientosBD) => {
    try {
      // limpiar mensajes previos
      setMessage({ successMessage: "", errorMessage: "", isLoading: true });
      let res;
      if (type === "new") {
        res = await movimientosService.create(data);
      } else {
        const updatePayload = prepareUpdatePayload({
          dirtyFields: dirtyFields,
          formData: data,
        });
        res = await movimientosService.update(data.id, updatePayload);
      }
      if (!res.success)
        throw new Error(
          typeof res.error === "string" ? res.error : JSON.stringify(res.error)
        );
      // refrescar lista de movimientos
      await getMovimientos();
      // reset form si es nuevo
      if (type === "new") reset();
      // mostrar mensaje de éxito
      setMessage({
        successMessage:
          type === "new"
            ? "Movimiento creado con éxito"
            : "Movimiento actualizado con éxito",
        errorMessage: "",
        isLoading: false,
      });
      // cerrar modal después de 2 segundos si es edición
      setTimeout(() => {
        setMessage({
          successMessage: "",
          errorMessage: "",
          isLoading: false,
        });
        if (type === "edit") closeModal();
      }, 2000);
    } catch (error) {
      console.log("Error creating movimiento:", error);
      setMessage({
        successMessage: "",
        errorMessage:
          typeof error === "string"
            ? error
            : error instanceof Error
              ? error.message
              : "Error desconocido",
        isLoading: false,
      });
    }
  };
  return (
    <>
    {categorias ? (
      <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        className="w-full max-w-sm space-y-4 mx-auto"
        disabled={isSubmitting}
      >
        <SelectInput
          id="tipo"
          label="Tipo de Movimiento"
          {...register("tipo", {
            required: "Necesitas un tipo de movimiento, ¿sabías?",
          })}
          error={errors.tipo?.message}
          defaultValue=""
        >
          <option value="">Selecciona un tipo</option>
          {tipoMovimientosOpt.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {capitalize(opt.label)}
            </option>
          ))}
        </SelectInput>
        <SelectInput
          id="categoria"
          label="Categoria"
          {...register("categoria", {
            required: "Necesitas un tipo de movimiento, ¿sabías?",
          })}
          error={errors.categoria?.message}
          defaultValue=""
        >
          <option value="">
            {watch("tipo")
              ? "Selecciona una categoría"
              : "Selecciona un tipo primero"}
          </option>
          {categorias
            .filter((opt) => opt.tipo === watch("tipo"))
            .map((opt) => (
              <option key={opt.id} value={opt.nombre}>
                {opt.nombre}
              </option>
            ))}
        </SelectInput>
        <CurrencyInput
          label="Monto"
          value={watch("monto")}
          placeholder="0.00"
          onChange={(value) => {
            setValue("monto", value === "" ? 0 : value, {
              shouldDirty: true,
            });
          }}
          error={errors.monto?.message}
        />
        <Input
          label="Concepto"
          placeholder="Compras para cena navideña"
          {...register("concepto", {
            required: "El concepto es obligatorio",
          })}
          error={errors.concepto?.message}
        />
        <Input
          label="Fecha del movimiento"
          type="date"
          {...register("fecha_movimiento", {
            required: "La fecha del movimiento es obligatoria",
          })}
          error={errors.fecha_movimiento?.message}
        />
        <SelectInput
          id="forma_de_pago"
          label="Forma de Pago"
          {...register("forma_de_pago", {
            required: "Tienes que anotar con que pagaste, ¿no?",
          })}
          error={errors.forma_de_pago?.message}
          defaultValue=""
        >
          <option value="">Selecciona un tipo</option>
          {formasDePagoOpt.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </SelectInput>
        {watch("forma_de_pago") === "tarjeta_de_credito" && (
          <ToggleCheckbox
            checked={watch("es_reservado")}
            onChange={(checked) => setValue("es_reservado", checked)}
            label="¿Se ha reservado el dinero?"
          />
        )}
      </fieldset>
      <Button
        variant="lime"
        type="submit"
        disabled={isSubmitting}
        className="w-full max-w-sm mx-auto mt-6 block"
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </Button>
    </form>
    ) : (
      <div className="flex flex-col items-center justify-center py-6 gap-4">
                <Spinning />
                <p className="text-zinc-700 dark:text-zinc-300 text-center max-w-xs">
                  Cargando recursos
                </p>
              </div>
    )}
    </>
  );
}
