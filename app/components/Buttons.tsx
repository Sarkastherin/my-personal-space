import { Button as FlowButton } from "flowbite-react";
import type { ButtonProps as FlowButtonProps } from "flowbite-react";
import { NavLink } from "react-router";

export const variants = {
  gray: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100",
  blue: "bg-blue-600 hover:bg-blue-700 text-white",
  green: "bg-green-600 hover:bg-green-700 text-white",
  red: "bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600",
  pink: "bg-pink-600 hover:bg-pink-700 text-white dark:bg-pink-500 dark:hover:bg-pink-600",
  lime: "bg-lime-600 hover:bg-lime-700 text-white dark:bg-lime-600 dark:hover:bg-lime-700",
  cyan: "bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-600 dark:hover:bg-cyan-700",
  yellow:
    "bg-yellow-200 dark:bg-yellow-700 hover:bg-yellow-300 dark:hover:bg-yellow-600 text-yellow-900 dark:text-yellow-100",
  dark: "bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-900",
  light: "bg-white hover:bg-gray-100 text-gray-900",
  outline_gray:
    "bg-gray-100 border border-gray-600 text-gray-900 hover:bg-gray-600 hover:text-white",
  outline_red:
    "bg-red-200 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
};
type VariantProps = keyof typeof variants;
type ButtonProps = FlowButtonProps & {
  variant?: VariantProps;
};

export function Button({
  variant = "gray",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <FlowButton
      {...props}
      className={`${variants[variant]} ${className} py-2 px-4`}
    />
  );
}

export function ButtonLink({
  variant = "gray",
  className = "",
  to,
  ...props
}: ButtonProps & { to: string }) {
  return (
    <NavLink to={to}>
      <Button
        {...props}
        variant={variant}
        className={`${className}`}
      />
    </NavLink>
  );
}
