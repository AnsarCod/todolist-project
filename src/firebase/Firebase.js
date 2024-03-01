import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQOO4bM5RNNMPbMfwz9DUbKGY9GuDh-uU",
  authDomain: "todolist-d19f1.firebaseapp.com",
  projectId: "todolist-d19f1",
  storageBucket: "todolist-d19f1.appspot.com",
  messagingSenderId: "207366194019",
  appId: "1:207366194019:web:7e40e85113a806929c4956",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage();
