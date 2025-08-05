import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Footer=()=>{
    const{isAuthenticated} =useContext(AuthContext);

    return(
        <footer style={{backgroundColor: "#ccc",padding:"10px"}}>
            {isAuthenticated ? "Welcome,User" : "Please log in.."}
        </footer>
    )
}
export default Footer;