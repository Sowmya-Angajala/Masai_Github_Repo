import { auth, db } from "./firebase-config.js";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import { doc, getDocs, setDoc, } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded',()=>{
    const loginbtn=document.getElementById('login-btn');
    const  signbtn = document.getElementById('signup-btn');
    const logoutbtn=document.getElementById('logout-btn');

    if(loginbtn){
        loginbtn.addEventListener('click',async()=>{
            const email=document.getElementById('login-email').value
            const password=document.getElementById('login-password').value;
            try{
                await signInWithEmailAndPassword(auth,email,password)
                    // Redirect the user to dasboard 
                    window.open("dashboard.html","_blank");
            }
            catch(error){
                 document.getElementById('login-message').innerText=error.message
            }
        })
    }
    if(signupBtn){
        signupBtn.addEventListener('click',async()=>{
            const email=document.getElementById("signup-email").value;
            const password=document.getElementById("signup-password").value;
            const role=document.getElementById("role").value;
            try {
                const userCredentials=await createUserWithEmailAndPassword(auth,email,password)
                await setDoc(doc(db,"users",userCredentials.user.uid))
                window.location.href="index.html"
            } catch (error) {
                document.getElementById('signup-message').innerText=error.message
            }

        })
    }
    if(logoutbtn){
        logoutbtn.addEventListener('click',async()=>{
            await signOut(auth);
            window.location.href="index.html"
        })
    }
})