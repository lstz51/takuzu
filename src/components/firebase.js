// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzJ3WI37bxfJCyrKD8OQ88hWyeLK7VTCc",
  authDomain: "cnam-web.firebaseapp.com",
  projectId: "cnam-web",
  storageBucket: "cnam-web.appspot.com",
  messagingSenderId: "369866440106",
  appId: "1:369866440106:web:b8a684cd82b6a3782affd3",
  measurementId: "G-S9YVT6RDPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);