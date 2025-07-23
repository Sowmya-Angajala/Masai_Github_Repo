import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB23nHSRSSD8DQPpNMBoJkbhRujgs5D5-8",
    authDomain: "notesapp-12058.firebaseapp.com",
    projectId: "notesapp-12058",
    storageBucket: "notesapp-12058.firebasestorage.app",
    messagingSenderId: "1082975396503",
    appId: "1:1082975396503:web:62026c6ac34e75c14a7fd2",
    measurementId: "G-03DCZ1R33M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);
