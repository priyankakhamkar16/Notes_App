import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create">Make Notes</Link>
          <Link to="/view">View Notes</Link>
        </nav>
        <Routes>
          <Route path="/create" element={<NoteForm fetchNotes={() => {}} />} />
          <Route path="/view" element={<NoteList />} />
          <Route path="/" element={<h1>Welcome to Notes App</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
