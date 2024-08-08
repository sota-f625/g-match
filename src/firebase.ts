import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAzzPsm6yHHbybVV7_RpDn7acIgSqQIrYc",
  authDomain: "g-match-3da4e.firebaseapp.com",
  projectId: "g-match-3da4e",
  storageBucket: "g-match-3da4e.appspot.com",
  messagingSenderId: "1053917355070",
  appId: "1:1053917355070:web:6eda5f79d2747f6cd2456f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, db };