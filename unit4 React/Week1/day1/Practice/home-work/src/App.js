
import './App.css';
import { useState } from 'react';

function App() {
  const[count,setCount]=useState(0);
  const increaseCount=()=>{
      setCount(count+1)     
  }
  return (
   <div>
    <span>
      {count}
    </span>
    <div>
    <button onClick={increaseCount}>Click me </button>
    </div>
   </div>
  );
}

export default App;
