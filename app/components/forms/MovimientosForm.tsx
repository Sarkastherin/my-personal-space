import { useForm } from "react-hook-form";
import { useUIModals } from "~/context/ModalsContext";
import { movimientosService } from "~/backend/services";
import { SelectInput, CurrencyInput, Input, ToggleCheckbox } from "../InputsForms";
import { tipoMovimientosOpt,categoriasOpt, formasDePagoOpt, type MovimientosBD } from "~/types/finanzas";
import { FooterForm } from "../FooterForm";
export default function MovimientosForm() {
  const {openModal} = useUIModals();
  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    watch,
    setValue,
    reset,
    handleSubmit,
  } = useForm<MovimientosBD>({
    defaultValues: {
      tipo: "",
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
      const res = await movimientosService.create(data);
      if (!res.success)
        throw new Error(typeof res.error === 'string' ? res.error : JSON.stringify(res.error));
      reset();
      openModal("SUCCESS", { message: "Movimiento creado con éxito" });
    } catch (error) {
      console.log("Error creating movimiento:", error);
      openModal("ERROR", { message: "Error al crear el movimiento" });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          className="w-full max-w-sm space-y-4 mx-auto"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <div className="mb-4 text-center text-sm text-gray-500">
              Guardando movimiento...
            </div>
          )}
          {isSubmitSuccessful && !isSubmitting && (
            <div className="mb-4 text-center text-sm text-green-600">
              Movimiento guardado con éxito!
            </div>
          )}
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
                {opt.label}
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
            {categoriasOpt
              .filter((opt) => opt.tipo === watch("tipo"))
              .map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
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
        <FooterForm colorButton="lime"/>
      </form>
  )
}