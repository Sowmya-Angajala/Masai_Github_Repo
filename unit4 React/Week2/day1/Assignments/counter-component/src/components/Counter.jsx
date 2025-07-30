import { useState } from "react";
function Counter({initialValue}){
    const[count,setCount]=useState(initialValue)

    return (
        <>
        <div> {count}</div>
        <button onClick={()=>setCount(prev=>prev+1)}>Increment</button>
       
        <button disabled={count<=0 ? true:false}   onClick={()=>setCount(prev=>prev-1)}>Decrement</button>
         
        </>

    )
}
export default Counter 