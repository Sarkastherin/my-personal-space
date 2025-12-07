import { createCrud } from "./crudFactory";
import type { MovimientosBD } from "~/types/finanzas";
export const movimientosService = createCrud<MovimientosBD>({
  sheetId: import.meta.env.VITE_ID_FINANZAS,
  nameSheet: "movimientos",
  nameFile: "finanzas",
});
