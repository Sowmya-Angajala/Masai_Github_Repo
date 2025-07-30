import { useState } from "react";

function ToggleButton(){
  const[color,setColor]=useState("green");
  const[text,SetText]=useState("ON")
   
  function handleOnclick(){
      setColor(color==='green' ? 'red':'green');
      SetText(text==='ON'?'OFF':"ON")
  }

return (
    <>
    {/* <div>{color}</div> */}
    <button style={{backgroundColor:color}}  onClick={handleOnclick}>{text}</button>
    

    
    
    
    </>
);

}
export default ToggleButton;