import { createContext, useContext, useState, useMemo } from "react";
import type { CRUDMethods } from "~/backend/crudFactory";
import { movimientosService } from "~/backend/services";
import type { MovimientosBD } from "~/types/finanzas";
import { logDetailedError, getFormattedError } from "~/utils/errorMessage";
import { useUIModals } from "./ModalsContext";

type DataContextType = {
  movimientos: MovimientosBD[] | null;
  getMovimientos: () => Promise<MovimientosBD[]>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { showError } = useUIModals();
  const [movimientos, setMovimientos] = useState<MovimientosBD[] | null>(null);
  const getMovimientos = async () => {
    return getCompleteData<MovimientosBD>({
      api: movimientosService,
      setData: setMovimientos,
    });
  };
  const getCompleteData = async <T extends Record<string, any>>({
    api,
    setData,
  }: {
    api: CRUDMethods<T>;
    setData: React.Dispatch<React.SetStateAction<T[] | null>>;
  }): Promise<T[]> => {
    const response = await api.read();
    if (!response.success) {
      logDetailedError(response.error);
      const formattedError = getFormattedError(response.error);
      showError(formattedError);
      throw new Error(formattedError);
    }
    // si response.data tiene la propiedad "nombre" se debe ordenar alfabeticamente
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0 &&
      "nombre" in response.data[0]
    ) {
      response.data.sort((a, b) => {
        const nombreA = (a as any).nombre.toLowerCase();
        const nombreB = (b as any).nombre.toLowerCase();
        if (nombreA < nombreB) return -1;
        if (nombreA > nombreB) return 1;
        return 0;
      });
    }
    setData((response.data as T[]) || []);
    return response.data as T[];
  };
  return (
    <DataContext.Provider value={{ movimientos, getMovimientos }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
