import { useState } from "react";


function ButtonColor(){
const[color,setColor]=useState("orange")
    return (
        <>
        <button onClick={()=>setColor(prev=> prev==="orange" ?"black" : "orange")} > Change color </button>
        <div style={{backgroundColor : color ,width:"400px",height:"400px"}} ></div>
        {color}
        </>
    )
}
export default ButtonColor;
