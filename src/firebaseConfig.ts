import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAUHxriuC7RrFFeIrdYI-FdQR7-p9vtXOs",
    authDomain: "delo-184df.firebaseapp.com",
    projectId: "delo-184df",
    storageBucket: "delo",
    messagingSenderId: "692987715836",
    appId: "AIzaSyAUHxriuC7RrFFeIrdYI-FdQR7-p9vtXOs"
  };

  const firebase = initializeApp(firebaseConfig);
  const db = getFirestore(firebase);
  
  export default db;
  