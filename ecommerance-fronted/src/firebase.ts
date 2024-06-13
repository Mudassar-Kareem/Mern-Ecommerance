
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBFOMX-LaOpna5QzRoSauvD3TagfPSMTr4",
  authDomain:"mern-ecommerance.firebaseapp.com",
  projectId: "mern-ecommerance",
  storageBucket: "mern-ecommerance.appspot.com",
  messagingSenderId: "344798800570",
  appId: "1:344798800570:web:3529a8e0d57153b7533083",
  measurementId:"G-L7LJD62PRW",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)