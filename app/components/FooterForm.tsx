import { Button, variants } from "./Buttons";
export function FooterForm({colorButton, label }: {colorButton?: keyof typeof variants; label?: string}) {
  return (
    <footer className="absolute bottom-0 left-0 w-full  flex justify-end items-center p-4 bg-gray-200 dark:bg-gray-800">
      <Button type="submit" variant={colorButton ?? "dark"} className="w-34">
        {label ?? "Guardar"}
      </Button>
    </footer>
  );
}
