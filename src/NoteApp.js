// NoteApp.js
import React, { useState, useEffect } from 'react';
import NoteCreation from './NoteCreation';
import WebSocketClient from './WebSocketClient'; // Your WebSocket client implementation

const NoteApp = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocketClient();
    
    ws.onMessage((message) => {
      // Handle incoming messages from the server
      const updatedNotes = JSON.parse(message.data);
      setNotes(updatedNotes);
    });

    // Clean up WebSocket connection on unmount
    return () => {
      ws.close();
    };
  }, []);

  // Function to send updates to the server when the user creates or updates a note
  const sendNoteUpdatesToServer = (updatedNotes) => {
    // Replace this with the actual code to send updates to the WebSocket server
    // For example:
    // const ws = new WebSocketClient();
    // ws.send(JSON.stringify(updatedNotes));
  };

  // Function to update the local state and send updates to the server
  const handleNoteUpdate = (updatedNote) => {
    // Update the local state
    const updatedNotes = [...notes];
    const index = updatedNotes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      updatedNotes[index] = updatedNote;
    } else {
      updatedNotes.push(updatedNote);
    }
    setNotes(updatedNotes);

    // Send updates to the server
    sendNoteUpdatesToServer(updatedNotes);
  };

  return (
    <div>
      <NoteCreation onNoteUpdate={handleNoteUpdate} />
      {/* Display and manage notes */}
      <div className="note-list">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteApp;
