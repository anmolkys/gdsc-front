import React, { useState } from "react";
import { AudioRecorder ,  useAudioRecorder  } from 'react-audio-voice-recorder';
import axios from "axios";



export default function Recorder({ onResponse }){


    const [status,setStatus] = useState("")

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
    const url = `https://gen-vxqd.onrender.com/live/23/upload/${filename}`;
    const formData = new FormData();
    formData.append('audio', blob, filename);
    console.log(`audio_${Date.now()}.wav`)
    const headers = {
        'Content-Type': 'multipart/form-data',
    };
    try{
        setStatus("Trying Uploading")
        const response = await axios.post(url, formData, { headers });
        console.log('File uploaded successfully:', response.data);
        onResponse(response.data)
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
    <button onClick={recorderControls.stopRecording}>Stop recording</button>
    <br />
  </div>
  )
}
