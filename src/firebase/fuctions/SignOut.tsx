import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../firebase";

const auth = getAuth(firebaseApp);
const SignOut = async () => {
  try {
    await signOut(auth);
    return "1";
  } catch (error) {
    console.log(error);
    return "0";
  }
};

export default SignOut