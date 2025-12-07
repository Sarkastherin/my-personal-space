export const MainContainer = ({
  children,
  justifyContent,
  alignItems,
}: {
  children: React.ReactNode;
  justifyContent?: "justify-center" | "justify-start" | "justify-end" | "justify-between" | "justify-around" | "justify-evenly" | "";
  alignItems?: "items-center" | "items-start" | "items-end" | "items-baseline" | "items-stretch" | "";
}) => {
  return (
    <div
      className={`flex flex-col min-h-[calc(100vh-117px)] w-full ${justifyContent ?? ""} ${alignItems ?? ""}`}
    >
      {children}
    </div>
  );
};
