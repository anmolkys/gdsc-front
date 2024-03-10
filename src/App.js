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
    <>
    <Live></Live>
    <div class="main-div">
        <div class="right">
        <h1>Apple Pie</h1>
            <div className="to-list">
            <Recorder onResponse={handleResponse}></Recorder>
            </div>
        </div>
        </div>
    </>
  )
}
