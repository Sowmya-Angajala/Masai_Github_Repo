import { auth, db } from "./firebase-config.js";
import {
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    doc,
    getDocs,
    setDoc,
    collection,
    addDoc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const notesList = document.getElementById('notes-list')
    const noteInput = document.getElementById('note-input')
    const addNoteBtn = document.getElementById('add-note-btn');
    let currentUser = null;

    // check Auth State

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            document.getElementById('user-email').innerText = currentUser.email

            // fetch user Role
            const userDoc = await getDocs(doc(db, "users", user.uid))
            if(userDoc.exists()){
                const role = userDoc.data().role;
                document.getElementById('user-role').innerText=role
                loadNotes(user,role)
            }
        }
        else{
            window.location.href="index.html";
        }
    })
    // LoadNotes
    async function loadNotes(user,role) {
        notesList.innerHTML=""
        const notesRef=collection(db,"notes");

        // fetch all the notes for every user can see all the notes
        const querySnapshot=await getDocs (notesRef);
        
        querySnapshot.forEach((doc)=>{
            const noteData=doc.data()
            displayNote(doc.id,noteData,user.uid)
        })
    }

    function displayNote(id,data,userId,role){
        const noteDiv=document.createElement("div")
        noteDiv.classList.add("note");
        noteDiv.innerHTML=`
        // <p>${data.content}</p>
        // <small>${data.userEmail}</small>
        // `
        const noteContent =document.createTextNode("div");
        noteDiv.classList.add("note")

        // create Elems

        const noteOwner =document.createTextNode('small')
        noteOwner.innerHTML=`By: ${data.userEmail}`

        noteDiv.append(noteContent,noteOwner)

        // only admin and owner shd able to edit and delete
        if(data.userId ===userId || role==="admin"){
            // Edit Button 
            const editbtn=document.createElement('button');
            editbtn.innerText="Edit"
            editbtn.classList.add("edit-btn");
            editBtn.onclick=()=>{
                const editTextarea = document.createElement('textarea')
                editTextarea.value=noteContent.innerText

                const saveBtn=document.createElement('button')
                saveBtn.innerText='save';
                saveBtn.classList.add('save-btn');
                saveBtn.onclick=async()=>{
                    const newContent =editTextarea.value.trim()
                    if(newContent!=""){
                        await setDoc(doc(db,"notes",id)={...data,content:newContent})
                        noteContent.innerText=newContent;
                        noteDiv,replaceChild(noteContent,editTextarea)
                        noteDiv.replaceChild(saveBtn,editbtn)
                    }
                }
                noteDiv.replaceChild(editTextarea,noteContent)
                noteDiv.replaceChild(saveBtn,editbtn);

            }

            // Delete button
            const deleteBtn=document.createElement('button')
            deleteBtn.innerText="Delete"
            deleteBtn.classList.add("delete-btn")
            deleteBtn.onclick=async()=>{
                await deleteDoc(doc(db,"notes",id));
                noteDiv.remove()
            }
            noteDiv.appendChild(editBtn);
            noteDiv.appendChild(deleteBtn);
        }
        notesList.appendChild(noteDiv);
    }

    // Add Note
    addNoteBtn.addEventListener('click',async()=>{
        const content=noteInput.value.trim()
        if(content==="") return 

        await addDoc(collection(db,"notes"),{
            content,
            userId :    currentuser.uid,
            userEmail : currentUser.email,
            createdAt : new Date()
        })
        noteInput.value="";
    })
})