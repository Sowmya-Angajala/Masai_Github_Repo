import { useState } from "react";


function Dynamic(){
    const [name,setName]=useState('');
    return (
        <>
        <button onClick={()=>setName('sumi')}>Sumi</button>
        <div>
        <button onClick={()=>setName('Varsha')}>Varsha</button>
        </div>
        <div>
            {name}
        </div>

        </>
    );
}
export default Dynamic 