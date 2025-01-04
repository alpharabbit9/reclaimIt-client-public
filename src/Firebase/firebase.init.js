// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAiv_1HEAsr2CZLg7FYKPlL4trgEHVjU4",
  authDomain: "reclaimit-e194f.firebaseapp.com",
  projectId: "reclaimit-e194f",
  storageBucket: "reclaimit-e194f.firebasestorage.app",
  messagingSenderId: "97905336622",
  appId: "1:97905336622:web:83825772a269a6551c1abf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default  auth ;