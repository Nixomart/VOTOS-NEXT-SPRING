import { Modal } from "flowbite-react";
import { useState } from "react";
import Button from "@/components/Buttons";
import { useDataContext } from "@/context/DataGlobal";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
export default function NewVote({ index, idCandidato }: any) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const [rangeValue, setRangeValue] = useState(500); // Establece un valor inicial
  const [pay, setPay] = useState(false);
  const [input, setInput] = useState(0);
  const [error, setError] = useState(false);
  const { data, setData } = useDataContext();
  const [log, setLog] = useState(false);
  const { usuario } = useUserContext();
  const handleRangeChange = (event: any) => {
    setRangeValue(Number(event.target.value));
    setPay(true);
    setInput(event.target.value);
    setError(false);
  };
  const handleChangeInput = (e: any) => {
    setError(false);
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
  const submit = async () => {
    try {
      const data = { idCandidato: idCandidato };
      await axios
        .post("http://localhost:8080/votacion/votar",data, {
          headers: {
            Authorization: `Bearer ${usuario.token}`,
          },
          withCredentials: false
        })
        .then((response: any) => {
          console.log("reposnse de votar: ", response);
          setLog(false);
        });
    } catch (error) {
      console.log("error al votar; ", error);
    }
    console.log("id: ", idCandidato);
  };

  return (
    <>
      <Button
        disabled={usuario === null}
        className="'px-5 py-2 rounded-xl text-xs bg-green-500 text-white border-gray-500 hover:bg-green-400 transition-all ease-in-out'"
        onClick={() => props.setOpenModal("default")}
      >
        Votar
      </Button>
      <Modal
        dismissible
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Vas a votar a {index}</Modal.Header>
        <Modal.Body>
          {window.localStorage.getItem("token") !== null ? (
            <>
              <p className="text-red-700 text-center text-3xl">vas a votar a {index}</p>
              <div className="flex flex-col space-y-10">
                <Button
                  className={
                    "px-32 py-11 rounded-xl text-6xl bg-green-500 text-white border-gray-500 hover:bg-green-400 transition-all ease-in-out"
                  }
                  disabled={error || log}
                  onClick={() => {
                    setLog(true), submit();
                  }}
                >
                  Votar {index === 'MILEI' && '💀'}
                </Button>
                <Button
                  className="px-32 py-11 rounded-xl text-6xl bg-gray-500 text-white border-gray-500 hover:bg-gray-400 transition-all ease-in-out"
                  onClick={() => props.setOpenModal(undefined)}
                >
                  Cancelar {index === 'MILEI' && '🙌'}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-center text-3xl text-red-600 dark:text-red-400">Debes Ingresar para votar.</p>
          )}
        </Modal.Body>
       
      </Modal>
    </>
  );
}
