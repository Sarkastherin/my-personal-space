import { createCrud } from "./crudFactory";
import type { MovimientosBD, PresupuestosBD, CategoriasBD } from "~/types/finanzas";
export const movimientosService = createCrud<MovimientosBD>({
  sheetId: import.meta.env.VITE_ID_FINANZAS,
  nameSheet: "movimientos",
  nameFile: "finanzas",
});
export const presupuestosService = createCrud<PresupuestosBD>({
  sheetId: import.meta.env.VITE_ID_FINANZAS,
  nameSheet: "presupuestos",
  nameFile: "finanzas",
});
export const categoriasService = createCrud<CategoriasBD>({
  sheetId: import.meta.env.VITE_ID_FINANZAS,
  nameSheet: "categorías",
  nameFile: "finanzas",
});