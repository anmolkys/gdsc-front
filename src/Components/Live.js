import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Live(){

    const [serverStatus,setServerStatus] = useState("")
    useEffect(()=>{
        const status = async () =>{
        try {
          const response = await axios.get('https://gen-vxqd.onrender.com/live');  
          setServerStatus(`↯ Server Version ${response.data.version} is Live`);
        } catch (error) {
          setServerStatus("Cannot Connect , Try Again Later TT");
        }
      };
    status() },[]);
    return(
        <h3>{serverStatus}</h3>
    )
}