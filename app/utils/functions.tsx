export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export function formatDateUStoES(value?: string) {
  if (!value) return "-";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}