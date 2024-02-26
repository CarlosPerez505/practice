import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';


// Initialize MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // Database host, usually 'localhost' for local development
    user: 'root', // Database user, 'root' is common for development
    password: 'data', // Password for the database user
    database: 'missing_women_db', // Name of the database
    port: 3307 // Port number where MySQL server is running, typically 3306 by default
});

// Attempt to connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies



// POST endpoint to add a new missing case
app.post('/api/missing_cases', (req, res) => {
    // Extract name, last_seen_date, and description from the request body
    const { name, last_seen_date, description } = req.body;

    // SQL query to insert a new missing case into the database
    const query = 'INSERT INTO missing_cases (name, last_seen_date, description) VALUES (?, ?, ?)';

    // Execute the query
    db.query(query, [name, last_seen_date, description], (err, result) => {
        if (err) {
            console.error('Error adding to database:', err);
            return res.status(500).json({ error: 'Failed to add to the database' });
        }
        res.status(201).json({ message: 'Entry added successfully', id: result.insertId });
    });
});

// GET endpoint to retrieve all missing cases
app.get('/api/missing_cases', (req, res) => {
    // SQL query to select all missing cases from the database
    const query = 'SELECT * FROM missing_cases';

    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching from database:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
});

// GET endpoint to retrieve a specific missing case by ID
app.get('/api/missing_cases/:id', (req, res) => {
    // Extract the ID from the request parameters
    const { id } = req.params;

    // SQL query to select a missing case by ID
    const query = 'SELECT * FROM missing_cases WHERE id = ?';

    // Execute the query
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching from database:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        if (results.length === 0) {
            // If no results found, return a 404 Not Found status
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json(results[0]);
    });
});

// PUT endpoint to update an existing missing case by ID
app.put('/api/missing_cases/:id', (req, res) => {
    // Extract ID and updated details from the request
    const { id } = req.params;
    const { name, last_seen_date, description } = req.body;

    // SQL query to update a missing case
    const query = 'UPDATE missing_cases SET name = ?, last_seen_date = ?, description = ? WHERE id = ?';

    // Execute the query
    db.query(query, [name, last_seen_date, description, id], (err, result) => {
        if (err) {
            console.error('Error updating database:', err);
            return res.status(500).json({ error: 'Failed to update the entry' });
        }
        if (result.affectedRows === 0) {
            // If no rows were affected, the entry was not found
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json({ message: 'Entry updated successfully' });
    });
});

// DELETE endpoint to remove a missing case by ID
app.delete('/api/missing_cases/:id', (req, res) => {
    // Extract the ID from the request parameters
    const { id } = req.params;

    // SQL query to delete a missing case by ID
    const query = 'DELETE FROM missing_cases WHERE id = ?';

    // Execute the query
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting from database:', err);
            return res.status(500).json({ error: 'Failed to delete the entry' });
        }
        if (result.affectedRows === 0) {
            // If no rows were affected, the entry was not found
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json({ message: 'Entry deleted successfully' });
    });
});



// Start the server on the specified port
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
