require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('MongoDB URI is not set. Please check your .env file.');
    process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Serve static files from the 'client/public' directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Define a root route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// Use notesRouter for '/api/notes' routes
const notesRouter = require('./routes/noteRoutes');
app.use('/api/notes', notesRouter);

// Route to serve view-notes.html
app.get('/view-notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/view-notes.html'));
});

// Route to serve make-notes.html
app.get('/make-notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/make-notes.html'));
});

// Catch-all route for unknown routes
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
