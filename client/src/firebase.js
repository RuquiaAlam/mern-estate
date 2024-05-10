// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a7de6.firebaseapp.com",
  projectId: "mern-estate-a7de6",
  storageBucket: "mern-estate-a7de6.appspot.com",
  messagingSenderId: "461653072616",
  appId: "1:461653072616:web:b1850b1440df559955c75d",
  measurementId: "G-DVKF7DGJN9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
