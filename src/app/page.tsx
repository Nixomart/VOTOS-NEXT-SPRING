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
        if (usuario === null) {
          const response = await axios.get(
            "http://192.168.0.5:8080/votacion/candidatos"
          );
          const data = response.data.payload;
          console.log(data);
          setData(data);
          setCandidates(data)
          setCarga(true);
        } else {
          const response = await axios.get(
            "http://192.168.0.5:8080/votacion/candidatosAuth",
            {
              headers: {
                Authorization: `Bearer ${token}`,
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

  /*  useEffect(() => {
    const fetchCandidates = async () => {
      const votesDocRef = doc(db, "votes", "president");
      const votesDocSnap = await getDoc(votesDocRef);
      if (votesDocSnap.exists()) {
        const unsubscribe = onSnapshot(votesDocRef, (snapshot) => {
          const votesData = snapshot.data();
          const candidatesArray = [];

          // Convertir los campos de candidatos en un arreglo de objetos
          for (const candidateId in votesData) {
            if (candidateId !== "metadata") {
              // Omitir campos especiales de Firestore
              candidatesArray.push(votesData[candidateId]);
            }
          }

          // Ordenar el arreglo de candidatos por votos (opcional)
          const sortedCandidates = candidatesArray.sort(
            (a, b) => b.votes - a.votes
          );

          setCandidates(sortedCandidates);
          setTopVote(sortedCandidates[0]);
          setCarga(true);
        });

        return () => {
          unsubscribe();
        };
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {}, [candidates]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (data === null || data === undefined) {
        if (usuarioFirebase) {
          setUsuario(usuarioFirebase);

          const docRef = doc(db, "users", usuarioFirebase.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("data: ", docSnap.data());
            setData(docSnap.data());
          }
        }
      }
    });

    if (usuario) {
      const docRef = doc(db, "users", usuario.uid);
      const unsubscribeData = onSnapshot(docRef, (snapshot) => {
        const userdata = snapshot.data();
        setData(userdata);
      });

      return () => {
        unsubscribe();
        unsubscribeData();
      };
    }

    return () => {
      unsubscribe();
    };
  }, [usuario]); */

  return carga === false ? (
    <Loading />
  ) : (
    <div className="bg-slate-300">
      <Nav />
      {/* title! */}
      <h1 className="text-center text-gray-700 font-semibold text-4xl py-5 mb-5 bg-slate-300 ">
        ¿Quien sera presidente???
      </h1>
      <section className="grid grid-cols-3 sm:grid-cols-1 gap-y-3 ">
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
