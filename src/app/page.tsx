"use client";
import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import Vote from "@/components/Vote";
import { useDataContext } from "@/context/DataGlobal";
import { useUserContext } from "@/context/UserContext";
import firebaseApp, { db } from "@/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  const { data, setData } = useDataContext();
  const { setUsuario } = useUserContext();
  const auth = getAuth(firebaseApp);
  const { usuario } = useUserContext();
  const [topVote, setTopVote] = useState(null);
  const [carga, setCarga] = useState(false);
  const [candidates, setCandidates] = useState<any>([]);
  /* useEffect(()=>{
const fetchUser = async ()=>{
  try {
    const token = window.localStorage.getItem("token")
    if (token) {
      axios
      .post("http://localhost:8080/auth/login", data)
      .then((response: any) => {
        console.log("responseee: ", response.data.message);
        if (response.data.message !== "sucess") {
        } else {
          window.localStorage.setItem("token", response.data.payload.token);
          setUsuario(response.data.payload);
        }
      });  
    }
    
  } catch (error) {
    
  }
}
fetchUser()
},[]) */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.localStorage.getItem("token");
        console.log("HAY SUARUIO?: ", usuario);
        
        if (usuario === null) {
          const response = await axios.get(
            "http://localhost:8080/votacion/candidatos"
          );
          const data = response.data.payload;
          console.log(data);
          setData(data);
          setCandidates(data)
          setCarga(true);
        } else {
          console.log("ISUARIOO TOKEN: ", usuario.token);
          
          const response = await axios.get(
            "http://localhost:8080/votacion/candidatosAuth",
            {
              headers: {
                Authorization: `Bearer ${usuario.token}`,
              },
            }
          );
          const data = response.data.payload;
          const votesData = response.data.payload;
          // Ordenar el arreglo de candidatos por votos (opcional)
          const sortedCandidates = votesData.sort(
            (a: any, b: any) => b.votos - a.votos
          );
          setData(sortedCandidates)
          setCandidates(sortedCandidates);
          setTopVote(sortedCandidates[0]);
          setCarga(true);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [usuario]);

  return carga === false ? (
    <Loading />
  ) : (
    <div className="bg-gray-50 h-screen sm:h-auto transition-all duration-300 dark:bg-slate-700">
      <Nav />
      {/* title! */}
      <h1 className="text-center font-extrabold dark:text-white text-gray-700 text-4xl py-5 border-b border-gray-500 ">
        ¿Quien sera el proximo presidente?
      </h1>
      <section className="grid grid-cols-4 sm:grid-cols-1 ">
        {candidates.map((vote: any, index: number) => (
          <Vote
            key={index}
            idCandidato={vote.id}
            name={vote.name}
            photo={vote.imagen}
            votes={vote.votos}
            index={vote.name}
            isTop={vote === topVote}
          />
        ))}
      </section>
    </div>
  );
}
