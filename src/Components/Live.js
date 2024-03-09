import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Live(){

    const [serverStatus,setServerStatus] = useState("")
    const baseLink = "https://applepie-5gox.onrender.com"
    useEffect(()=>{
        const status = async () =>{
        try {
          let response = await axios.get(`${baseLink}/ping`);  
          if(response){
            setServerStatus(`↯ Server version ${response.data.version} is Live`);
          }
          else{
            setServerStatus("Server Overloaded , Try Again Later TT")
          }
        } catch (error) {
          setServerStatus("Cannot Connect , Try Again Later TT");
        }
      };
    status() },[]);
    return(
        <h3>{serverStatus}</h3>
    )
}