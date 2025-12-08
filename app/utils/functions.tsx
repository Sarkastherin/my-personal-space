export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export function formatDateUStoES(value?: string) {
  if (!value) return "-";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}
export type DirtyMap<T> = Partial<Record<keyof T, boolean>>;
type Props<T extends { id: number | string }> = {
  dirtyFields: DirtyMap<T>;
  formData: T;
};
export const prepareUpdatePayload = <T extends { id: number | string }>({
  dirtyFields,
  formData,
}: Props<T>) => {
  const updatePayload = Object.entries(dirtyFields).reduce(
    (acc, [key, isDirty]) => {
      if (isDirty) {
        acc[key as keyof T] = formData[key as keyof T];
      }
      return acc;
    },
    {} as Partial<T>
  );
  return updatePayload;
};