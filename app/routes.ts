import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  route("login", "routes/login.tsx"),
  layout("layouts/main.tsx", [
    index("routes/home.tsx"),
    route("nuevo-gasto", "routes/nuevo-gasto.tsx"),
    ...prefix("proyectos", [
      index("routes/proyectos/home.tsx"),
    ]),
    ...prefix("finanzas", [
      index("routes/finanzas/home.tsx"),
      route("movimientos", "routes/finanzas/movimientos.tsx"),
      route("presupuesto", "routes/finanzas/presupuesto.tsx"),
    ]),
  ]),

] satisfies RouteConfig;
