import React, { useRef, useState } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  const[focusmessage,setFocusmessage]=useState(null);

  function focusInput() {
    inputRef.current.focus();
    setFocusmessage("Focused!")
    console.log(inputRef)
  }
  return (
    <>
      <input ref={inputRef} type="text" placeholder="please enter..." style={{backgroundColor:focusmessage ? "orange":""}}/>
      <p>{focusmessage}</p>

      <button onClick={focusInput}   >Focus Input</button>
    </>
  );
}
export default FocusInput;
