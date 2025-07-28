import { useState } from "react";


function ButtonModel(){
    const[open,setOpen]=useState(false);
    // const[close,setClose]=useState("");
    return(
        <>
        
        <div>
            <button onClick={()=>setOpen(prev=>prev ? false:true)}>open</button>
               {open === true ?
                  <div>opened</div> : null
               }
        </div>
        {open} 

        
        
        </>
    );
}
export default ButtonModel;