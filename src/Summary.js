import React from "react";
import Pdf from "./Components/Pdf";
import { useState , useEffect } from "react";
import axios from "axios";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Summary() {

    const [parsedText, setParsedText] = useState("");
    const [summary, setSummary] = useState("")
    const handleParse = (text) => {
        setParsedText(text);
    };
    let debounceTimer;
    useEffect(() => {
        // Debounce the summarise function for parsedText
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (parsedText !== "") {
            summarise();
          }
        }, 500); // Adjust the delay time as needed
      }, [parsedText]);

    function summarise() {
        setSummary("⚡Loading")
        axios.post('https://applepie-5gox.onrender.com/summary', {
            text: parsedText,
        })
            .then(response => {
                console.log('Response:', response.data);
                let richText = documentToReactComponents(response.data.summary)
                setSummary(richText);
            })
            .catch(error => {
                console.error('Error:', error);
                setSummary(error)
            })
    }


    return (
        <>
            <h1>PDF Summary</h1>
            <Pdf onParse={handleParse}></Pdf>
            <h4>{summary}</h4>
        </>

    )
}