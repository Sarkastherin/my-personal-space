import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  route("login", "routes/login.tsx"),
  layout("layouts/main.tsx", [
    index("routes/home.tsx"),
    ...prefix("proyectos", [
      index("routes/proyectos/home.tsx"),
    ]),
    ...prefix("finanzas", [
      index("routes/finanzas/home.tsx"),
      route("movimientos", "routes/finanzas/movimientos.tsx"),
    ]),
  ]),

] satisfies RouteConfig;
