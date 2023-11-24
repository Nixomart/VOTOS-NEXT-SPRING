import firebaseApp from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseApp);
const signInWithPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(()=>{ return '1'} 
    )
    .catch(()=>{ return '0'});
};

export default signInWithPassword;
