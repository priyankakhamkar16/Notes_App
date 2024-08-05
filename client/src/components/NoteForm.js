// client/src/components/NoteForm.js
import React, { useState } from 'react';

const NoteForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send a POST request to create a new note
        const response = await fetch('http://localhost:5001/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, date })
        });

        if (response.ok) {
            alert('Note created successfully!');
            setTitle('');
            setDescription('');
            setDate('');
        } else {
            alert('Failed to create note');
        }
    };

    return (
        <form onSubmit={handleSubmit} id="noteForm">
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <button type="submit">Create Note</button>
        </form>
    );
};

export default NoteForm;
