import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import Auth, { Logout } from "my-auth-google";
const apiKey = import.meta.env.VITE_API_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;

type AuthContextType = {
  auth: boolean | null;
  isLoading: boolean;
  getAuth: () => Promise<void>;
  logout: () => void;
};
type AuthProviderProps = {
  children: ReactNode;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const authGoogle = async () => {
    try {
      if (!apiKey || !clientId) {
        console.error('Missing API Key or Client ID');
        throw new Error('Configuración de Google Auth incompleta');
      }
      
      const authResult = await Auth(apiKey, clientId);
      return authResult;
    } catch (error) {
      console.error('Error during authentication:', error);
      // Si es un error de red, podemos intentar de nuevo
      if (error instanceof Error && error.message.includes('502')) {
        console.log('Error de red detectado, reintentando en 2 segundos...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
          const retryResult = await Auth(apiKey, clientId);
          return retryResult;
        } catch (retryError) {
          console.error('Error en el reintento:', retryError);
          throw retryError;
        }
      }
      throw error;
    }
  };
  
  const getAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const authResult = await authGoogle();
      setAuth(authResult);
      console.log('Autenticación exitosa:', authResult);
    } catch (error) {
      console.error('Error en getAuth:', error);
      setAuth(false);
      // Aquí podrías mostrar un mensaje de error al usuario
      alert('Error al iniciar sesión con Google. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const logout = useCallback(() => {
    const logoutResult = Logout();
    if (logoutResult) {
      setAuth(false);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ auth, isLoading, getAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};