import { useUserContext } from "@/context/UserContext";
import signInWithPassword from "@/firebase/fuctions/SignIn";
import axios from "axios";
import { Modal } from "flowbite-react";
import { useState } from "react";
import Button from "@/components/Buttons";
import { ImSpinner2 } from "react-icons/im";
export default function SignIn() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const { usuario, setUsuario } = useUserContext();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [log, setLog] = useState(false);
  const props = { openModal, setOpenModal };
  const sumbitLogin = async () => {
    const data = { email, password };
    axios
      .post("http://localhost:8080/auth/login", data)
      .then((response: any) => {
        if (response.data.message !== "sucess") {
          setErr("hubo un error en el inicio de sesion.");
          setLog(false);
        } else {
          props.setOpenModal(undefined);
          window.localStorage.setItem("token", response.data.payload.token);
          setUsuario(response.data.payload);
          setLog(true);
        }
      });
  };
  return (
    <>
      <Button
        className="px-5 rounded-xl text-xs bg-blue-500 text-white border-gray-500 hover:bg-blue-400 transition-all ease-in-out"
        onClick={() => props.setOpenModal("default")}
      >
        Ingresar
      </Button>
      <Modal
        dismissible
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Ingresa para empezar a votar.</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <label
              htmlFor="helper-text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@example.com"
            />
            <label
              htmlFor="helper-text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="*******"
            />
          </div>
        </Modal.Body>
        {err != "" && <p className="text-red-600 text-center">{err}</p>}
        <Modal.Footer>
          <Button
            disabled={email === "" || password === ""}
            className={`px-5 py-2 ${
              email === "" || (password === "" && "bg-blue-400")
            } rounded-xl text-xs bg-blue-500 text-white border-gray-500 hover:bg-blue-400 transition-all ease-in-out`}
            onClick={() => {
              setLog(true), sumbitLogin();
            }}
          >
            {log ? (
              <ImSpinner2 className="animate-spin mx-auto text-xl" />
            ) : (
              <span>Ingresar</span>
            )}
          </Button>
          <Button
            className="px-5 py-2 rounded-xl text-xs bg-gray-500 text-white border-gray-500 hover:bg-gray-400 transition-all ease-in-out"
            onClick={() => props.setOpenModal(undefined)}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
