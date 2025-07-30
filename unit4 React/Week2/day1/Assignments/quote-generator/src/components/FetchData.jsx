import { useState } from "react";
import { useEffect } from "react";

function FetchData() {
    const [data, setData] = useState("");


   async function fetchQuote(){
    try {
            let response = await fetch("https://api.quotable.io/random");
            let result = await response.json();
            setData(result)
            // console.log(result);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
    }

    useEffect(() => {
        const timer =setInterval(()=>{
            
        fetchQuote()
        },7000)
       return ()=>{
            clearInterval(timer);
            console.log("stop");
            
       }
    }, [])
    return (
        <>

            <h2 style={{"fontSize":"75px"}}>Random Quote</h2>
            <div>
            
            </div>
            <div>
                <p style={{"fontSize":"18px","backgroundColor":'Green' ,"padding":'8px',"borderRadius":'24px',"color":"white"}}>{data.content}</p>
            </div>
            <h2>-{data.author}</h2>
            <button style={{"backgroundColor":"gold","color":"black"}}   onClick={fetchQuote}>Get New Quote</button>


        </>
    )
}



export default FetchData