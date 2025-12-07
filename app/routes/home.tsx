import type { Route } from "./+types/home";
import { GrProjects, GrMoney } from "react-icons/gr";
import { CardNav } from "~/components/Cards";
import type { VariantProps } from "~/components/Cards";
import { MainContainer } from "~/components/Containers";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Personal Space" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const links = [
    {
      path: "/proyectos",
      title: "Mis proyectos",
      icon: GrProjects,
      description: "Organiza y gestiona tus proyectos aquí.",
      variant: "pink",
    },
    {
      path: "/finanzas",
      title: "Mis finanzas",
      icon: GrMoney,
      description: "Organiza y gestiona tus finanzas aquí.",
      variant: "lime",
    },
  ];
  return (
    <MainContainer justifyContent="justify-center" alignItems="items-center">
      <h1 className="logo text-5xl mb-6 md:text-6xl lg:text-7xl md:mb-24 text-center">
        Kathe
      </h1>
      <div className="flex flex-col gap-4 md:flex-row md:gap-6 w-full max-w-4xl">
        {links.map((link) => (
          <CardNav
            key={link.path}
            path={link.path}
            title={link.title}
            icon={link.icon}
            variant={link.variant as VariantProps}
          >
            {link.description}
          </CardNav>
        ))}
      </div>
    </MainContainer>
  );
}
