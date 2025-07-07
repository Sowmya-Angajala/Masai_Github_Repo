// firebase-config.js (ES Module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB19Kt6iaVaRbNU9rQwE0mOGNTqs0Veqss",
  authDomain: "auth-7ad98.firebaseapp.com",
  projectId: "auth-7ad98",
  storageBucket: "auth-7ad98.firebasestorage.app",
  messagingSenderId: "550506531670",
  appId: "1:550506531670:web:5ab2cc6368a2a12b96a4f7",
  measurementId: "G-3HC65V919Z",
 databaseURL: "https://auth-7ad98-default-rtdb.asia-southeast1.firebasedatabase.app"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, auth, db };
