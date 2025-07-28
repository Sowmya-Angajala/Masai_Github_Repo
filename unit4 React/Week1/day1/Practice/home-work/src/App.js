
import './App.css';
import { useState } from 'react';
import Dynamic from './Components/dynamicbutton';
import ButtonModel from './Components/buttonmodel';
import ButtonColor from './Components/btn-color-change';

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
    <Dynamic />
    <ButtonModel/>
    <ButtonColor/>
   </div>

  );
}

export default App;
