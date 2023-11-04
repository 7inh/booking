import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "src/common/instances/firebaseAuth-instance";

const loginWithFirebase = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
};

export default loginWithFirebase;
