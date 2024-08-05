// client/src/components/Note.js
import React, { useState } from 'react';
import axios from 'axios';

const Note = ({ note, fetchNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/notes/${note._id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5001/api/notes/${note._id}`, { title, description });
      fetchNotes();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <span className="note-date">{new Date(note.date).toLocaleDateString()}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Note;
