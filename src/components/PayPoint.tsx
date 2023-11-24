import { Button, Modal } from "flowbite-react";
import {  useState } from "react";
import { useDataContext } from "@/context/DataGlobal";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";

export default function PayPoint() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const [rangeValue, setRangeValue] = useState(500); // Establece un valor inicial
  const [pay, setPay] = useState(false);
  const [input, setInput] = useState(0);
  const [error, setError] = useState(false);
  const { data } = useDataContext();
  const { usuario } = useUserContext();
  
  const handleRangeChange = (event: any) => {
    setRangeValue(Number(event.target.value));
    setPay(true);
    setInput(parseInt(event.target.value, 10));
    setError(false);
  };
  const handleChangeInput = (e: any) => {
    setPay(false);
    setInput(parseInt(e.target.value, 10)); // Convierte el valor a número
    if (e.target.value > 11000) {
      setError(true);
    } else {
      setError(false);
    }
  };
  const submit = async () => {
    setInput(0);
    if (pay) {
      const response = await axios.post(
        `${process.env.VITE_SERVER}/generar/${usuario.uid}`,
        { price: input }
      );
      const subscriptionUrl = response.data;
      window.location.href = subscriptionUrl;
      props.setOpenModal(undefined);
    } else {
      const response = await axios.post(
        `${process.env.VITE_SERVER}/generar/${usuario.uid}`,
        { price: input }
      );
      const subscriptionUrl = response.data;
      window.location.href = subscriptionUrl;
      props.setOpenModal(undefined);
    }
  };
 /*  useEffect(() => {
    console.log("input: ", input);
  }, [input]); */
  return (
    <>
      <Button onClick={() => props.setOpenModal("default")}>
        Comprar Puntos
      </Button>
      <Modal
        dismissible
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Paga el monto que desees!</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Esta pagina esta hecha con Diversion pero mantenerla me cuesta
              dinero, paga los puntos que quieras desde 1 hasta el que desees
              
            </p>
            <p className="text-red-600">
              Lo maximo que se puede comprar es 11000 puntos y solo se puede
              comprar una vez por dia.
            </p>
            <p className="text-red-800 text-xl text-center">
              Solo puedes comprar Una vez al dia! 1 = 3PUNTOS 
            </p>
            <hr />
            <div className="flex justify-around">
              <button
                onClick={() => {
                  setPay(false), setInput(0);
                }}
                className={`boder w-full lg:px-3 lg:py-2 ${
                  pay == false && "bg-blue-200"
                } hover:bg-blue-200 transition-all ease-in-out border-2`}
              >
                Ingresar monto especifico
              </button>
              <button
                onClick={() => {
                  setPay(true), setInput(0);
                }}
                className={`boder w-full lg:px-3 lg:py-2 ${
                  pay && "bg-blue-200"
                } hover:bg-blue-200 transition-all ease-in-out border-2`}
              >
                Rango de Monto
              </button>
            </div>
            <div>
              {pay === false ? (
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ingresa los puntos que quieras comprar
                  </label>
                  <input
                    onChange={(e) => handleChangeInput(e)}
                    type="number"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <div className="flex">
                    <p>Lo que te vas a tener: </p>
                    {data !== null ? (
                      <p>{data.points + input || data.points}</p>
                    ) : (
                      <p>{input}</p>
                    )}
                  </div>
                  {error && (
                    <p className="text-red-700 text-center">
                      No se puede ingresar esa cantidad.
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="default-range"
                    className="block mb-2 text-lg text-center  font-medium text-gray-900 dark:text-white"
                  >
                    Rango por 100$ hasta 11000$
                  </label>
                  <input
                    id="default-range"
                    type="range"
                    /* value={rangeValue}  */
                    onChange={(e) => handleRangeChange(e)} // Manejar el cambio de valor
                    min="1" // Establece el valor mínimo a 100
                    max="11000" // Establece el valor máximo a 10000
                    step="100" // Establece el incremento en 100
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <p>A comprar: {rangeValue} </p>
                  <div className="flex">
                    <p>Lo que te vas a tener: </p>
                    {data !== null ? (
                      <p>{data.points + input || data.points}</p>
                    ) : (
                      <p>{rangeValue}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {data !== null ? (
            <>
              <Button
                disabled={
                  error ||
                  input == 0 ||
                  Number.isNaN(input) ||
                  input.toString().includes("e") ||
                  (data.hasOwnProperty("enabled_to_vote") &&
                    new Date(data.enabled_to_vote) > new Date())
                }
                onClick={submit}
              >
                Comprar
              </Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <p className="text-red-500">
              Necesitas Ingresar para poder comprar!
            </p>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
