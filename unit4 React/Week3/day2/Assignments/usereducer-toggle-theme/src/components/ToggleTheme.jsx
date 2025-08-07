import React, { useReducer } from "react";


const Reducer=(state,action)=>{

    switch(action.type){
        case  'Toggle_theme':
        return  state ==="light" ? 'dark' :'light';
        default:
            return state;

    };
}

function ToggleTheme(){

   const[theme,dispatch] =useReducer(Reducer,'light') 
   const toggleTheme=()=>{
    dispatch({type:"Toggle_theme"});
   };

   return(
    <>
     <div style={{
      backgroundColor: theme === 'light' ? '#fff' : '#333', 
      color: theme === 'light' ? '#000' : '#fff', //for text color
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>

        <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

    </div>  
    </>
   )
}
export default ToggleTheme;