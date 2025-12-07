import { Card as FlowCard } from "flowbite-react";
import { NavLink } from "react-router";
const variants = {
  pink: "text-pink-600 dark:text-pink-400",
  lime: "text-lime-600 dark:text-lime-400",
};
export type VariantProps = keyof typeof variants;
type CardNavProps = {
  path: string;
  variant: VariantProps;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: string | React.ReactNode;
};
export const CardNav = ({
  path,
  variant,
  title,
  icon: Icon,
  children,
}: CardNavProps) => {
  return (
    <NavLink to={path} className={variants[variant] + " flex-1"}>
      <FlowCard className="hover:scale-105 transition-all duration-300 ease-in-out">
        <Icon className="size-5" />
        <h5 className=" text-2xl font-semibold">{title}</h5>
        <div className="text-body mb-6 text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </FlowCard>
    </NavLink>
  );
};
type CardWithImageProps = {
  imagePath: string;
};
export const CardWithImage = ({imagePath}: CardWithImageProps) => {
  return (
    <div className="max-w-sm border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 rounded-lg">
      <div className="overflow-hidden rounded-t-lg">
        <img src={imagePath} alt="" />
      </div>
      <div className="p-6 text-center">
        <a href="#">
          <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">
            Streamlining your design process today.
          </h5>
        </a>
        <a
          href="#"
          className="inline-flex items-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Read more
          <svg
            className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
