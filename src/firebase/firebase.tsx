import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBk-WFJxCvhcWMergbZ6r58xh32d1DtRqU",
    authDomain: "spring-firebase-votos.firebaseapp.com",
    projectId: "spring-firebase-votos",
    storageBucket: "spring-firebase-votos.appspot.com",
    messagingSenderId: "361366605849",
    appId: "1:361366605849:web:9de2db969af116edd59a88"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp) 

export default firebaseApp;