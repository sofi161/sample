// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB57R2EgylvdvD27jX8FQO56fvpkn0_xeU",
  authDomain: "moodl-2f86d.firebaseapp.com",
  projectId: "moodl-2f86d",
  storageBucket: "moodl-2f86d.firebasestorage.app",
  messagingSenderId: "1082808538961",
  appId: "1:1082808538961:web:efd2d457cdfa5ea140a570",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
