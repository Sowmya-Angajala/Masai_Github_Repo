import { useContext } from 'react';
import './App.css'
import { ThemeContext, ThemeProvider } from './ThemeContext';
import NestedComponent from './Components/NestedComponent';


function App() {


  return (
    <>
      <ThemeProvider>
        <Content/>
      </ThemeProvider>
    </>
  );
}

function Content(){
  const{theme,toggleTheme} =useContext(ThemeContext);
  const appStyle ={
     backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
        color: theme === 'light' ? '#000000' : '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
  };
  return (
    <div style={appStyle}>
      <h1>Current Theme :{theme}</h1>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      <NestedComponent/>

    </div>
  )
}

export default App
