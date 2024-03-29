import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import morgan from 'morgan';


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
app.use(morgan('dev'));


// This will log every request that comes into your server/ middleware.
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for '${req.url}'`);
    console.log(req.path)
    next();
});




//A generic error handler that will catch any errors thrown in the application.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});






app.get(`/api/missingCases/search`, (req, res) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    console.log(searchTerm)


    const formattedSearchTerm = `%${searchTerm}%`;
    console.log(formattedSearchTerm)

    // Use % to match any sequence of characters in SQL LIKE operator
    const query = 'SELECT * FROM missingCases WHERE LOWER(name) LIKE LOWER(?)';

    db.query(query,  [formattedSearchTerm], (err, results) => {
        if (err) {
            console.error('Error searching in database:', err);
            return res.status(500).json({ error: 'Error during search' });
        }
        res.json(results);
    });
});

// POST endpoint to add a new missing case
app.post('/api/missingCases', (req, res) => {
    // Extract name, last_seen_date, and description from the request body
    const { name, age, lastSeenDate, lastSeenLocation, description, reportedDate=new Date()  } = req.body;

    // SQL query to insert a new missing case into the database
    const query = 'INSERT INTO missingCases (name, age, lastSeenDate, lastSeenLocation, description, reportedDate) VALUES (?, ?, ?, ?, ?, ?)';

    // Execute the query
    db.query(query, [name, age, lastSeenDate, lastSeenLocation, description, reportedDate], (err, result) => {
        if (err) {
            console.error('Error adding to database:', err);
            return res.status(500).json({ error: 'Failed to add to the database' });
        }
        res.status(201).json({ message: 'Entry added successfully', id: result.insertId });
    });
});

// GET endpoint to retrieve all missing cases
app.get('/api/missingCases', (req, res) => {
    // SQL query to select all missing cases from the database
    const query = 'SELECT * FROM missingCases';

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
app.get('/api/missingCases/:id', (req, res) => {
    // Extract the ID from the request parameters
    const { id } = req.params;

    // SQL query to select a missing case by ID
    const query = 'SELECT * FROM missingCases WHERE id = ?';

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

// PATCH endpoint to update an existing missing case by ID (replacing the PUT method for partial updates)
app.patch('/api/missingCases/:id', (req, res) => {
    // Extract the case ID from the URL parameter
    const { id } = req.params;

    // Extract fields from the request body
    const {name, age, lastSeenDate, lastSeenLocation, description, reportedDate } = req.body;

    // Prepare the SQL query to update the missing case
    const query = `
        UPDATE missingCases SET
        age = COALESCE(?, age),
        lastSeenDate = COALESCE(?, lastSeenDate),
        lastSeenLocation = COALESCE(?, lastSeenLocation),
        description = COALESCE(?, description),
        reportedDate = COALESCE(?, reportedDate)
        WHERE id = ?`;

    // Execute the query
    db.query(query, [name, age, lastSeenDate, lastSeenLocation, description, reportedDate, id], (err, result) => {
        if (err) {
            console.error('Error updating database:', err);
            return res.status(500).json({ error: 'Failed to update the database' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No such case found' });
        }
        res.status(200).json({ message: 'Entry updated successfully' });
    });
});



// DELETE endpoint to remove a missing case by ID
app.delete('/api/missingCases/:id', (req, res) => {
    // Extract the ID from the request parameters
    const { id } = req.params;

    // SQL query to delete a missing case by ID
    const query = 'DELETE FROM missingCases WHERE id = ?';


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



//temporary endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint reached' });
});


// This will catch any requests to endpoints that don't exist in your application.
app.all('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});


// Start the server on the specified port
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
