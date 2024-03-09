import React, { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Recorder from "./Components/Recorder";
import Live from "./Components/Live";
import "./App.css"
import Todoist from "./Components/Todoist";
import axios from "axios";
import todoGet from "./functions";


export default function App(){

  const redirect = "http://localhost:3000/"
  const [responseData, setResponseData] = useState({file:"",id:"",text:"",todos:"",url:""});
  const [code,setCode] = useState("")
  const [token,setToken] = useState("")


  const navigate = useNavigate();
  
  const handleSummary = () => {
    navigate('/summary'); 
  };

  //get Data from Child
  const handleResponse = (data) => {
    setResponseData(data);
  }

  useEffect(() => {
    const getCodeAndStateFromURL = () => {
      const url = window.location.href;
      const params = new URLSearchParams(url.split('?')[1]);
      if(params){
        const code = params.get('code');
        const state = params.get('state');
        setCode(code);
        console.log('State:', state);
      }
    };
    getCodeAndStateFromURL();
  }, []);

  useEffect(() => {
    async function exchange(code) {
      const accessTokenEndpoint = 'https://todoist.com/oauth/access_token';
      const clientID = 'b66cc0ad5d5440e3b7398f761447d423';
      const clientSecret = 'e8884d0f19b74526bdf188555d8bfe64';
      const redirectURI = redirect;

      try {
        const response = await axios.post(accessTokenEndpoint, {
          client_id: clientID,
          client_secret: clientSecret,
          code: code,
          redirect_uri: redirectURI
        });

        return response.data.access_token;
      } catch (error) {
        console.error('Error exchanging code for token:', error);
        throw new Error('Failed to exchange code for token');
      }
    }

    if(code !== ""){
      exchange(code).then(token => {
        setToken(token);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [code]);

  useEffect(() => {
    if(token){
      todoGet(token);
    }
  }, [token]);

  return(
    <div className="main">
      <Live></Live>
      <button onClick={handleSummary}>Summary</button>
      <br />
      <Recorder onResponse={handleResponse}></Recorder>
      <h3>{token ? "Authorized" : "Error Authorizing"}</h3>
      <Todoist></Todoist>
    </div>
  )
}
