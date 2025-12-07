import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Proyectos" },
    { name: "description", content: "Gestiona tus proyectos aquí." },
  ];
}
export default function Home() {
  return <div>Home Proyecto</div>;
}