import React, { useState } from "react";

import Recorder from "./Components/Recorder";
import Live from "./Components/Live";
import "./App.css"




export default function App(){
  const [responseData, setResponseData] = useState({file:"",id:"",text:"",todos:"",url:""});


  const handleResponse = (data) => {
    setResponseData(data);
  }



  return(
    <div className="main">
      <Live></Live>
      <br />
      <Recorder onResponse={handleResponse}></Recorder>
    </div>
  )
}
