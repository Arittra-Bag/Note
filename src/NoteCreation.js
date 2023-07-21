// NoteCreation.js
import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css'; // Import Draft.js default styles

const NoteCreation = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleTextFormatting = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        handleEditorChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  // Helper function to convert the EditorState content to raw JSON format
  const getNoteContentInRawFormat = () => {
    const contentState = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(contentState));
  };

  // Helper function to load the EditorState content from raw JSON format
  const loadNoteContentFromRawFormat = (rawContent) => {
    const contentState = convertFromRaw(JSON.parse(rawContent));
    return EditorState.createWithContent(contentState);
  };

  return (
    <div>
      <button onClick={() => handleTextFormatting('BOLD')}>Bold</button>
      <button onClick={() => handleTextFormatting('ITALIC')}>Italic</button>
      <button onClick={() => handleTextFormatting('UNDERLINE')}>Underline</button>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={mapKeyToEditorCommand}
      />
      {/* Save or update the note with the content in raw JSON format */}
      <button onClick={() => saveOrUpdateNote(getNoteContentInRawFormat())}>Save</button>
    </div>
  );
};

export default NoteCreation;
