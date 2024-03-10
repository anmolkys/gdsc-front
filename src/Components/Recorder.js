import React, { useState } from "react";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import axios from "axios";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Api from "./Api";
import loadingImage from "./loading.gif"; // Import your loading image

export default function Recorder({ onResponse }) {
  const baseLink = "https://applepie-5gox.onrender.com";
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading image

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: false,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    // const audio = document.createElement('audio');
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
    uploadAudio(blob);
  };

  async function uploadAudio(blob) {
    const timestamp = Date.now(); // Get current timestamp
    const randomString = Math.random().toString(36).substring(7);
    const filename = `audio_${timestamp}_${randomString}.wav`;
    console.log(filename);
    const url = `${baseLink}/upload/`;
    const formData = new FormData();
    formData.append('file', blob);
    console.log(`audio_${Date.now()}.wav`);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    try {
      setLoading(true); // Show loading image
      const response = await axios.post(url, formData, { headers });
      console.log('File uploaded successfully:', response.data);
      onResponse(response.data.notes);
      setNotes(documentToReactComponents(response.data.notes));
      extractTodos(response.data.notes);
      setLoading(false); // Hide loading image when data is received
    } catch (error) {
      console.log(error);
      setStatus("Server Loaded, Try Again");
      setLoading(false); // Hide loading image if there's an error
    }
  }

  const extractTodos = (notes) => {
    let todosStartIndex = notes.indexOf("**Todos:**");
    if (todosStartIndex !== -1) {
      const todosSection = notes.substring(todosStartIndex);
      const todosArray = todosSection.split('\n').filter(line => line.trim() !== '');
      const slicedTodos = todosArray.slice(1); // Exclude the '**Todos:**' line itself
      setTodos(slicedTodos);
    }
    
    let todossStartIndex = notes.indexOf("**Todos and Tasks:**");
    if (todossStartIndex !== -1) {
      const todosSection = notes.substring(todossStartIndex);
      const todosArray = todosSection.split('\n').filter(line => line.trim() !== '');
      const slicedTodos = todosArray.slice(1); // Exclude the '**Todos:**' line itself
      setTodos(slicedTodos);
    }
  };
  

  return (
    <div className="recorder">
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
        downloadFileExtension="wav"
        showVisualizer={true}
        classes={"recorderButton"}
      />
      <br />
      {loading && <img src={loadingImage} alt="Loading" />} {/* Show loading image if loading */}
      <h3>{status}</h3>
      <br />
      <br />
      <p className="notes">{notes}</p>
      <Api todos={todos} /> {/* Pass the extracted todos to the Api component */}
    </div>
  );
}
