import { Card as FlowCard } from "flowbite-react";
import type { Route } from "../+types/home";
import { MainContainer } from "~/components/Containers";
import { CardWithImage, CardNav } from "~/components/Cards";
import { Button, ButtonLink } from "~/components/Buttons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Finanzas" },
    { name: "description", content: "Gestiona tus finanzas aquí." },
  ];
}
{
}
export default function Home() {
  return (
    <MainContainer alignItems="items-center">
      <div className="flex gap-4 mb-6">
        <ButtonLink variant="blue" to="/finanzas/movimientos">
          + Movimientos
        </ButtonLink>
        <ButtonLink variant="lime" to="/finanzas/presupuesto">
          + Presupuesto
        </ButtonLink>
      </div>
      <hr className="mb-6 text-gray-300 dark:text-gray-700 w-full" />
      <div className="flex flex-row gap-6">
        <p className="text-xl text-gray-600">Dashboard 📊</p>
      </div>
    </MainContainer>
  );
}
