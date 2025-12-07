import type { Route } from "./+types/home";
import { useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router";
import { Card, TextInput, Label } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../components/Buttons";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "User login page" },
  ];
}

export default function Login() {
  const { getAuth, auth, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      console.log("User is already authenticated, redirecting to home.", auth);
      navigate("/");
    }
  }, [auth, navigate]);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="logo text-4xl mb-6 md:text-6xl md:mb-18 text-center">Kathe</h1>
      <div className="max-w-sm w-full">
        <Card className="shadow-xl">
          <div className="space-y-6">
            <h1 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
              Iniciar Sesión con Google
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Accede a tu cuenta personal con un solo clic
            </p>
            <Button
              onClick={getAuth}
              className="w-fit mx-auto bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Conectando...
                </>
              ) : (
                <>
                  <FcGoogle className="w-4 h-4 mr-2" />
                  Continuar con Google
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
