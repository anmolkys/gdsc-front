import React, { useState, useEffect } from "react";

export default function Api() {
  const [token, setToken] = useState('');
  const [boardId, setBoardId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const tokenValue = params.get('token');
    if (tokenValue) {
      setToken(tokenValue);
      createBoard(tokenValue);
    }
  }, []);

  const handleAuthorize = () => {
    const authorizeURL = 'https://api.trello.com/1/authorize/';
    const key = '40a9bec91fbb5d78a56c454cdb823ff2';
    const returnURL = 'https://gdsc-front.onrender.com/';
    const scope = 'read,write';
    const expiration = '1hour';
    const name = 'apple';
    const callbackMethod = 'fragment';
    const responseType = 'token';

    const urlParams = new URLSearchParams({
      key,
      return_url: returnURL,
      scope,
      expiration,
      name,
      callback_method: callbackMethod,
      response_type: responseType,
    });

    const fullURL = `${authorizeURL}?${urlParams.toString()}`;
    window.location.href = fullURL; // Redirect user to authorization URL
  };

  const createBoard = async (token) => {
    try {
      // Get current date
      const currentDate = new Date().toLocaleDateString();
  
      // Create a new board with the current date as the name
      const response = await fetch(`https://api.trello.com/1/boards/?key=40a9bec91fbb5d78a56c454cdb823ff2&token=${token}&name=${currentDate}`, {
        method: 'POST'
      });
      const data = await response.json();
      setBoardId(data.id);
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };
  
  const updateBoardWithNotes = async () => {
    try {
      // Sample notes from parent component
      const notes = ['Note 1', 'Note 2', 'Note 3'];
  
      // Get current date
      const d = new Date();
      let time = d.getTime();
      const currentDate = `Apple ${time}`
  
      // Create a list with the current date
      const listResponse = await fetch(`https://api.trello.com/1/lists?key=40a9bec91fbb5d78a56c454cdb823ff2&token=${token}&name=${currentDate}&idBoard=${boardId}`, {
        method: 'POST'
      });
      const listData = await listResponse.json();
  
      // Append each note as a card in the created list
      for (const note of notes) {
        await fetch(`https://api.trello.com/1/cards?key=40a9bec91fbb5d78a56c454cdb823ff2&token=${token}&name=${note}&idList=${listData.id}`, {
          method: 'POST'
        });
      }
    } catch (error) {
      console.error('Error updating board with notes:', error);
    }
  };
  
  
  useEffect(() => {
    if (boardId) {
      updateBoardWithNotes();
    }
  }, [boardId]);

  return (
    <>
      <div>
        {token ? (
          <p>Authorization Success</p>
        ) : (
          <button onClick={handleAuthorize} disabled={token} className="voice-record">Sync</button>
        )}
      </div>
    </>
  );
}
