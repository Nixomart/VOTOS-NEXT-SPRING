import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useDataContext } from "@/context/DataGlobal";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
export default function NewVote({index, idCandidato}:any) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const [rangeValue, setRangeValue] = useState(500); // Establece un valor inicial
  const [pay, setPay] = useState(false);
  const [input, setInput] = useState(0);
  const [error, setError] = useState(false);
  const { data, setData } = useDataContext();
  const [log, setLog] = useState(false)
  const {usuario} = useUserContext()
  const handleRangeChange = (event: any) => {
    setRangeValue(Number(event.target.value));
    setPay(true);
    setInput(event.target.value);
    setError(false);
  };
  const handleChangeInput = (e: any) => {
    setError(false)
    setPay(false);
    if (e.target.value.includes("e")) {
      setError(true);
    } else {
      setInput(parseInt(e.target.value, 10)); // Convierte el valor a número
      if (e.target.value > data.points) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };
  const submit = () => {
    
    try {
      const data={idCandidato}
      console.log("data antes de votar: ", data);
      const token = window.localStorage.getItem("token")
      axios.post('http://192.168.0.5:8080/votacion/votar', data ,{
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then((response:any)=>{
        console.log(response);
        setLog(false)
      })
    } catch (error) {
      console.log("error al votar; ",error);
      
    }
    console.log("id: ", idCandidato);
  };

  return (
    <>
      <Button disabled={usuario !== null && usuario.voto} onClick={() => props.setOpenModal("default")}>Votar</Button>
      <Modal
        dismissible
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Vota monto que desees!</Modal.Header>
        <Modal.Body>
          {data !== null ? (
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Esta pagina esta hecha con Diversion, paga los puntos que quieras desde 1 hasta el que desees. Registrandote tienes puntos gratis!
              </p>
              <p className="text-red-600">
               Lo maximo que puedes votar es 100.000
              </p>
          
              <hr />
              <div className="flex justify-around">
                <button
                  onClick={() => {
                    setPay(false), setInput(rangeValue);
                  }}
                  className={`boder w-full lg:px-3 lg:py-2 ${
                    pay == false && "bg-blue-200"
                  } hover:bg-blue-200 transition-all ease-in-out border-2`}
                >
                  Ingresar monto especifico
                </button>
                <button
                  onClick={() => {
                    setPay(true);
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
                      htmlFor="specific"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Ingresa los puntos que quieras votar
                    </label>
                    <input
                      onChange={(e) => handleChangeInput(e)}
                      type="number"
                      id="specific"
                      value={input}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                    <div className="flex">
                      <p>Lo que te va a quedar: </p>
                      {data !== null ? (
                        <p>
                          {Number.isNaN(input)
                            ? data.points
                            : data.points - input}
                        </p>
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
                      Rango por 1 hasta 100.000
                    </label>
                    <input
                      id="default-range"
                      type="range"
                      /* value={rangeValue}  */
                      onChange={(e) => handleRangeChange(e)} // Manejar el cambio de valor
                      min="1" // Establece el valor mínimo a 100
                      max="100000" // Establece el valor máximo a 10000
                      step="100" // Establece el incremento en 100
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <p>A Votar: {rangeValue} </p>
                    <div className="flex">
                      <p>Lo que te va a quedar: </p>
                      {data !== null ? (
                        <p>{data.points - rangeValue}</p>
                      ) : (
                        <p>{rangeValue}</p>
                      )}
                    </div>
                    {error && (
                      <p className="text-red-700 text-center">
                        No se puede ingresar esa cantidad.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>Nesesitas loguearte</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {data !== null && (
            <>
            <p className="text-red-700">vas a votar a {index}</p>
              <Button disabled={error || data.points < 1 || log} onClick={()=>{setLog(true), submit()}}>
                Votar
              </Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                Cancelar
              </Button>
            </>
          )}
          {data !== null && data.points < 1 && (
            <p className="text-red-500">
              Tus puntos son insuficientes para votar!
            </p>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
