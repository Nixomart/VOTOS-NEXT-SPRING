import { useState, useEffect } from "react";
import PayPoint from "./PayPoint";
import SignIn from "./Sign-in";
import SignUp from "./Sign-up";
import { useDataContext } from "@/context/DataGlobal";
import { useUserContext } from "@/context/UserContext";
import SignOut from "@/firebase/fuctions/SignOut";
import { Button } from "flowbite-react";
export default function Nav() {
  const [theme, setTheme] = useState("light");
  const { data, setData } = useDataContext();
  const { usuario, setUsuario } = useUserContext();
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const handleSingOut = () => {
    try {
      SignOut().then((response: any) => {
        if (response === "1") {
          setData(null);
          setUsuario(null);
        }
      });
    } catch (error) {}
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <h1 className="text-2xl font-bold uppercase dark:text-gray-300">Quien Gana? Nicolass mm</h1>
        {
        usuario == null ? <p>Ingresa para poder votar</p> :  
        
        data && data != null && data.hasOwnProperty('enabled_to_vote') && new Date(data.enabled_to_vote) < new Date() || data !== null && !data.hasOwnProperty('enabled_to_vote' )  ? (
          <div className="bg-green-600 text-white rounded-lg py-2 px-3 shadow-md">

          <p >Hablitado para comprar</p>
          </div>
        ) : (
          <div className="bg-red-600 text-white rounded-lg py-2 px-3 shadow-md">

          <p >No Hablitado para comprar</p>
          </div>
        )}
        <button
          onClick={handleTheme}
          className="text-gray-700 border  rounded-xl py-2 px-3 hover:bg-blue-200 ease-in-out transition-all dark:text-white"
        >
          Dark!
        </button>
        <PayPoint />
       
        <div className=" flex flex-col w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {data == null ? (
              <>
                <li>
                  <SignIn />
                </li>
                <li>
                  <SignUp />
                </li>
              </>
            ) : (
              <>
                <div>
                  <p className="text-gray-800 font-bold dark:text-white">
                    Hola: {data.username}
                  </p>
                  <p className="text-gray-800 font-bold dark:text-white">
                    Tus puntos: {data.points}
                  </p>
                </div>
                <li>
                  <Button onClick={handleSingOut}>Salir</Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
