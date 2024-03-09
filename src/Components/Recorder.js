import React, { useState } from "react";
import { AudioRecorder ,  useAudioRecorder  } from 'react-audio-voice-recorder';
import axios from "axios";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';



export default function Recorder({ onResponse }){

    const baseLink = "http://localhost:5500"
    const [status,setStatus] = useState("")
    const [notes,setNotes] = useState("");

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: false,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
    uploadAudio(blob);
  };

  async function uploadAudio(blob) {
    const timestamp = Date.now(); // Get current timestamp
    const randomString = Math.random().toString(36).substring(7);
    const filename = `audio_${timestamp}_${randomString}.wav`
    console.log(filename)
    const url = `${baseLink}/upload/`;
    const formData = new FormData();
    formData.append('file', blob);
    console.log(`audio_${Date.now()}.wav`)
    const headers = {
        'Content-Type': 'multipart/form-data',
    };
    try{
        setStatus("Getting Text , Please Wait")
        const response = await axios.post(url, formData, { headers });
        console.log('File uploaded successfully:', response.data);
        onResponse(response.data)
        setNotes(documentToReactComponents(response.data.notes))
        //setNotes(response.data.notes)
        setStatus("Uploaded , Check Console .")
    }
    catch(error){
        console.log(error)
        setStatus("Error Occured , Check Console")
    }
    
  }
  
  return(
    <div>
    <AudioRecorder
      onRecordingComplete={(blob) => addAudioElement(blob)}
      recorderControls={recorderControls}
      // downloadOnSavePress={true}
      downloadFileExtension="wav"
      showVisualizer={true}
    />
    <br />
    <h3>{status}</h3>
    <br />
    <br />
    <p>{notes}</p>
  </div>
  )
}
