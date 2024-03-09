import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Live(){

    const [serverStatus,setServerStatus] = useState("")
    const baseLink = "http://localhost:5500"
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