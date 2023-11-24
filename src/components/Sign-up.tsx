import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useUserContext } from "@/context/UserContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LiaEyeSlash, LiaEyeSolid } from "react-icons/lia";
import firebaseApp, { db } from "@/firebase/firebase";
import signupWithLinkPass from "@/firebase/fuctions/SignUp";
export default function SignUp() {
    const {  setUsuario } = useUserContext();
   const [openModal, setOpenModal] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(firebaseApp);
  const [view, setView] = useState(false);
  const [error, setError] = useState("");
  const [log, setLog] = useState(false);
  const props = { openModal, setOpenModal };
  const finUser = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const docRef = doc(db, "users", querySnapshot.docs[0].id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  const specialCharactersRegex = /[%$'¡!?¿{}#+=*:;,.@<>"´´¨¨¨ ~()\/\s]/;

  const handleSignup = async () => {
    const result = await finUser();
    if (specialCharactersRegex.test(username)) {
      setError("El nombre de usuario no puede incluir signos.");
      setLog(false);
    } else {
      if (result == false) {
        try {
          const result = await signupWithLinkPass(email, password);
          if (result.success) {
            setError("Correo de verificacion enviado!");
               onAuthStateChanged(auth, (usuarioFirebase) => {
              if (usuarioFirebase) {
                setUsuario(usuarioFirebase);
                const userDocRef = doc(db, "users", usuarioFirebase.uid);
                setDoc(userDocRef, {
                    username: username,
                    points: 200
                }).then(() => {
                  setLog(false)
                  props.setOpenModal(undefined)
                  ;
                });
              } else {
                setUsuario(null);
              }
            });
          } else {
            setError('Hubo un error: la contraseña debe ser mayor a 6 o El email es invalido.');
            setLog(false);
          }
        } catch (error) {
          console.log("ERROR EN REGISTRO");
        }
      } else {
        setLog(false);
        setError("este nombre ya esta en uso");
      }
    }
  };

  return (
    <>
      <Button
        onClick={() => props.setOpenModal("default")}
        className="bg-red-700"
      >
        Registrarme
      </Button>
      <Modal
        dismissible
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Registrate para empezar a votar.</Modal.Header>
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
              placeholder="name@gmail.com"
            />
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              We’ll never share your details
              .
            </p>
            <label
              htmlFor="helper-text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contraseña
            </label>
            <div className="flex">
              <input
                type={view ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {view === false ? (
             <button className="text-gray-500" onClick={()=>{setView(true)}}>
                  {" "}
                  <LiaEyeSolid className="text-3xl" />
                </button>
              ) : (
             <button className="text-gray-500" onClick={()=>{setView(false)}}>
                  <LiaEyeSlash  className="text-3xl"/>
                </button>
              )}
            </div>

            <label
              htmlFor="helper-text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre de usuario
            </label>
            <input
              type="email"
              onChange={(e) => setUsername(e.target.value)}
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="JuanMa"
            />
          </div>
        </Modal.Body>
        {error != '' && <p className="text-red-600 text-center">{error}</p>}
        <Modal.Footer>
          <Button
            disabled={log}
            onClick={() => {
              setLog(true), handleSignup();
            }}
          >
            {log ? (
              <ImSpinner2 className="animate-spin mx-auto text-xl" />
            ) : (
              <span>Registrarme</span>
            )}
          </Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
