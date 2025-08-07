import React, { useEffect, useState } from "react";

function FetchData(){
const[data,setData] =useState([]);
const[page,setPage] =useState(1);


    async function FetchData(){
        let response =await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`)
        let res=await response.json();
        console.log(res);
        setData(res)
    }
useEffect(()=>{
    FetchData();
},[page])

    return(
        <>
        <p style={{backgroundColor:"blueviolet"}}> To-Do-App (page{page})</p>
        <div>
            <ul> {data.map((item, index)=>(
                <p key={index}>{item.title}</p>
            ))}
        </ul>
        </div>
        <button onClick={()=>setPage((prev)=>prev-1)} disabled={page==1} >Prev</button>
        <button onClick={()=>setPage((prev)=>prev+1)}>Next</button>

        </>

    );
    
}
export default FetchData;