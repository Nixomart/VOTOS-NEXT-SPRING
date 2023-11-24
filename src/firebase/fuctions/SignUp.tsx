import firebaseApp from '../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

const auth = getAuth(firebaseApp);

const signupWithLinkPass = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);
    console.log('Correo de verificación enviado.');
    window.localStorage.setItem('email', email);
    return { success: true };
  } catch (error:any) {
    console.log(
      'Error al crear usuario con correo electrónico y contraseña.',
      error
    );
    return { success: false,  error: error.message  };
  }
};
export default signupWithLinkPass;