// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7RzKaeViGAPhZjvSPSoYOZfPfJOAQMu8",
  authDomain: "journal-react-v2.firebaseapp.com",
  projectId: "journal-react-v2",
  storageBucket: "journal-react-v2.appspot.com",
  messagingSenderId: "1000479232355",
  appId: "1:1000479232355:web:0369786a65048b5bb54356"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
// Authenticate with Firebase
export const FirebaseAuth = getAuth(FirebaseApp);
// Access DB
export const FirebaseDB   = getFirestore(FirebaseApp);
