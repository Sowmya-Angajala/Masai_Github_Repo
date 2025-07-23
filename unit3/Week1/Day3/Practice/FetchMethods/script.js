// Fetch and its parts

// GET/POST/PATCH/DELETE

// Refer the mdn for types of Content-type
// fetch("url",{
//     method:"POST", //Defines the req type PATCH/DELETE
//     headers:{"Content-Type":"application/json"},//Tells the server about the data type(json foramat or jpg format or text format)we are sending
//     body:JSON.stringify({key:value}),//Data being sent to DB
// })

//                  POST

// async function addPost(){
//   let response=await fetch("https://jsonplaceholder.typicode.com/posts",{
//     method:"POST",
//     headers:{"Content-Type":"application/json"},
//     body:JSON.stringify({
//         name:"tommy",
//         age:20
//     })  
// });
// let data=await response.json();
// console.log(data)
// }
// addPost()


//                   PATCH

// async function patchData(){
//     let res=await fetch("https://jsonplaceholder.typicode.com/posts/2",{
//         method:"PATCH",
//         headers:{"Content-Type": "application/json"},
//         body:JSON.stringify({
//             title:"Updated Title"
//         })
//     })

//     // handled promise with json
//     let data =await res.json();
//     console.log(data)
// }
// patchData()


//                  DELETE
async function  deletePost(){
    let res=await fetch("https://jsonplaceholder.typicode.com/posts/2",{
    method:"DELETE",
})

let data =await res.json()
console.log(data)
}
deletePost()
