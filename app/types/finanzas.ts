export const tipoMovimientosOpt = [
  { label: "Ingreso", value: "ingreso" },
  { label: "Gasto", value: "gasto" },
  { label: "Transferencia", value: "transferencia" },
]; 
export const formasDePagoOpt = [
  { label: "Efectivo", value: "efectivo" },
  { label: "Tarjeta de crédito", value: "tarjeta_de_credito" },
  { label: "Tarjeta de débito", value: "tarjeta_de_debito" },
];
export type CommonTypes = {
  id: string;
  fecha_creacion: string;
}
export type MovimientosBD = CommonTypes & {
  tipo: (typeof tipoMovimientosOpt)[number]["value"];
  categoria: string
  monto: number;
  concepto: string;
  fecha_movimiento: string;
  forma_de_pago: (typeof formasDePagoOpt)[number]["value"];
  es_reservado: boolean;
}
export type PresupuestosBD = CommonTypes & {
  concepto: string;
  categoria: string;
  monto_presupuestado: number;
  periodo: string; // e.g., "2024-06"
}
export type CategoriasBD = CommonTypes & {
  nombre: string;
  nombre_con_emoji: string;
  tipo: (typeof tipoMovimientosOpt)[number]["value"];
}