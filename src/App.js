import React, { useState } from "react";
import Recorder from "./Components/Recorder";
import Live from "./Components/Live";
import "./App.css"


export default function App(){

  const [responseData, setResponseData] = useState({file:"",id:"",text:"",todos:"",url:""});

  //get Data from Child
  const handleResponse = (data) => {
    setResponseData(data);
  }
  
  return(
    <div className="main">
      <Live></Live>
      <br />
      <Recorder onResponse={handleResponse}></Recorder>
      <ul>
        <li>{responseData.text}</li>
        <li>{responseData.todos}</li>
        <li>{responseData.url}</li>
      </ul>
    </div>
  )
}