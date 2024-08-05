// client/src/components/NoteList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/notes');
        setNotes(response.data);
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div className="note" key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <span className="note-date">{new Date(note.date).toLocaleDateString()}</span>
          <div className="note-actions">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
