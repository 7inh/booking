import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { FIREBASE } from "src/common/configs";
import { browserLocalPersistence } from "firebase/auth";

initializeApp(FIREBASE);
const auth = getAuth();
auth.setPersistence(browserLocalPersistence);

export default auth;
