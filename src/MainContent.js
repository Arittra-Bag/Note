// MainContent.js
import React from 'react';
import NoteCreation from './NoteApp';

const MainContent = () => {
  return (
    <main className="main-content">
      {/* Note creation component */}
      <NoteCreation />
      {/* Display and manage other notes */}
      <div className="note-list">
        {/* List of notes */}
        <div className="note">
          <h3>Note Title</h3>
          <p>Note content goes here...</p>
        </div>
        {/* Add more notes */}
      </div>
    </main>
  );
};

export default MainContent;
