  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCf-nrvo1Uzjhub2ReVk-cl3mNw-_rd27s",
    authDomain: "authentication-87154.firebaseapp.com",
    projectId: "authentication-87154",
    storageBucket: "authentication-87154.firebasestorage.app",
    messagingSenderId: "447649313895",
    appId: "1:447649313895:web:17a4e5d6f9921a1780d0c2",
    measurementId: "G-HWZ0SBTK0L",
    databaseURL : "https://authentication-87154-default-rtdb.asia-southeast1.firebasedatabase.app",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
