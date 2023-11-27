import { useState, useEffect } from "react";
import SignIn from "./Sign-in";
import SignUp from "./Sign-up";
import { useDataContext } from "@/context/DataGlobal";
import { useUserContext } from "@/context/UserContext";
import { LuMoon, LuSun } from "react-icons/lu";

import Button  from "@/components/Buttons";
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
      setUsuario(null);
      window.localStorage.removeItem("token");
      /*   SignOut().then((response: any) => {
        if (response === "1") {
          setData(null);
          setUsuario(null);
        }
      }); */
    } catch (error) {}
  };

  return (
    <nav className="bg-gray-50 border-b-gray-500 border border-gray-200 dark:bg-slate-700 transition-all duration-300">
      <div className="max-w-screen-xl justify-between flex px-4">
        <h1 className="text-2xl font-bold dark:text-gray-300 my-auto">¿Quien Gana las elecciones?</h1>
        <div className=" flex md:block md:w-auto">
          <ul className="font-medium flex p-4 space-x-5 rounded-lg ">
            <button
              onClick={handleTheme}
              className="text-gray-700 dark:text-white rounded-full py-2 px-3 dark:hover:bg-blue-800 hover:bg-blue-200 ease-in-out transition-all"
            >
              {theme === "light" ? <LuMoon /> : <LuSun />}
            </button>
            {usuario == null ? (
              <>
                <SignIn />
                <SignUp />
              </>
            ) : (
              <>
                <div>
                  <p className="text-gray-800 font-bold dark:text-white">
                    Hola: {usuario.username}
                  </p>
                  <p className="text-gray-800 font-bold dark:text-white">
                    {usuario.voto
                      ? `ya votaste a ${usuario.candidado}`
                      : "no votaste"}
                  </p>
                  <p className="text-gray-800 font-bold dark:text-white">
                    {usuario.email}
                  </p>
                </div>
                  <Button className={'px-5 my-auto py-2 rounded-xl text-xs bg-red-500 text-white border-gray-500 hover:bg-red-400 transition-all ease-in-out'} onClick={handleSingOut}>Salir</Button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
