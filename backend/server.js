import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'data',
    database: 'missing_person_db',
    port: 3307
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

// Update the allowed origins to include localhost and your network IP
const allowedOrigins = ['http://10.0.0.163:5173', 'http://localhost:5173', 'http://172.18.32.1:5173'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(morgan('dev'));

// This will log every request that comes into your server/middleware.
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for '${req.url}'`);
    next();
});


app.get('/api/scrape', async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 5;

    console.log(`Scrape endpoint called with limit: ${limit}`);

    try {
        console.log('Starting scraper...');
        await scraper(limit);
        console.log('Scraper finished successfully');
        res.status(200).send('Scraper finished successfully');
    } catch (error) {
        console.error('Scraping error:', error);
        res.status(500).send('Scraping error');
    }
});
// Scraper endpoint
/*app.get('/api/scrape', async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 5;
    console.log(`Scrape endpoint called with limit: ${limit}`);

    console.log(`Scrape endpoint called with limit: ${limit}`);
    console.log('Scraper is starting...');

    try {
        const data = await scraper.scrape(limit);
        console.log('Scraped data:', data);
        res.json(data);
        console.log('Scraper has finished running.');
    } catch (error) {
        console.error('Scraping error:', error);
        res.status(500).send(error.message);
        console.log('Scraper encountered an error.');
    }
});*/

// Manual trigger endpoint for the scraper

// API endpoints for managing missing cases
app.get('/api/missingCases/search', (req, res) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    const formattedSearchTerm = `%${searchTerm}%`;
    const query = 'SELECT * FROM missingCases WHERE LOWER(name) LIKE LOWER(?)';

    db.query(query, [formattedSearchTerm], (err, results) => {
        if (err) {
            console.error('Error searching in database:', err);
            return res.status(500).json({ error: 'Error during search' });
        }
        res.json(results);
    });
});

app.post('/api/missingCases', (req, res) => {
    const { name, age, lastSeenDate, lastSeenLocation, description, reportedDate = new Date() } = req.body;
    const query = 'INSERT INTO missingCases (name, age, lastSeenDate, lastSeenLocation, description, reportedDate) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [name, age, lastSeenDate, lastSeenLocation, description, reportedDate], (err, result) => {
        if (err) {
            console.error('Error adding to database:', err);
            return res.status(500).json({ error: 'Failed to add to the database' });
        }
        res.status(201).json({ message: 'Entry added successfully', id: result.insertId });
    });
});

app.get('/api/missingCases', (req, res) => {
    const query = 'SELECT * FROM missingCases';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching from database:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        res.json(results);
    });
});

app.get('/api/missingCases/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM missingCases WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching from database:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json(results[0]);
    });
});

app.patch('/api/missingCases/:id', (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'No fields provided for update' });
    }

    const setClause = Object.keys(updateFields).map(key => `${key} = ?`).join(', ');
    const queryParams = [...Object.values(updateFields), id];

    const query = `UPDATE missingCases SET ${setClause} WHERE id = ?`;

    db.query(query, queryParams, (err, result) => {
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

app.delete('/api/missingCases/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM missingCases WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting from database:', err);
            return res.status(500).json({ error: 'Failed to delete the entry' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json({ message: 'Entry deleted successfully' });
    });
});

// Temporary endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint reached' });
});

// Catch-all handler to serve the React app for any other requests
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// This will catch any requests to endpoints that don't exist in your application.
app.all('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start the server on the specified port
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
