export const tipoMovimientosOpt = [
  { label: "Ingreso", value: "ingreso" },
  { label: "Gasto", value: "gasto" },
  { label: "Transferencia", value: "transferencia" },
]; 
export const categoriasOpt = [
  { label: "🏠 Vivienda", value: "vivienda", tipo: "gasto" },
  { label: "🧾 Servicios", value: "servicios", tipo: "gasto" },
  { label: "🚗 Auto", value: "auto", tipo: "gasto" },
  { label: "💌 Remesas", value: "remesas", tipo: "gasto" },
  { label: "🛒 Alimentos", value: "alimentos", tipo: "gasto" },
  { label: "🩺 Salud", value: "salud", tipo: "gasto" },
  { label: "💸 Deuda", value: "deuda", tipo: "gasto" },
  { label: "🧘🏻‍♀️ Estilo de vida", value: "estilo de vida", tipo: "gasto" },
  { label: "🧑‍⚖️ Impuestos", value: "impuestos", tipo: "gasto" },
  { label: "🔘 Otros", value: "otros", tipo: "gasto" },
  { label: "💰 Salario", value: "salario", tipo: "ingreso" },
  { label: "💵 Honorarios", value: "honorarios", tipo: "ingreso" },
]
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
  categoria: (typeof categoriasOpt)[number]["value"];
  monto: number;
  concepto: string;
  fecha_movimiento: string;
  forma_de_pago: (typeof formasDePagoOpt)[number]["value"];
  es_reservado: boolean;
}