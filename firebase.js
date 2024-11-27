// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as dotenv from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

dotenv.config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "nexa-beta-418d6.firebaseapp.com",
  databaseURL:
    "https://nexa-beta-418d6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nexa-beta-418d6",
  storageBucket: "nexa-beta-418d6.appspot.com",
  messagingSenderId: "687087422945",
  appId: "1:687087422945:web:be778d123969e4504c96a0",
  measurementId: "G-5XM277M58H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
