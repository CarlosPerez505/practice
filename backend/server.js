import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Initialize MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'data',
    database: process.env.DB_NAME || 'missing_person_db',
    port: process.env.DB_PORT || 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the database connection
pool.getConnection()
    .then(connection => {
        console.log('Connected to the database.');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://10.0.0.163:5173', 'http://localhost:5173', 'http://172.18.32.1:5173'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for '${req.url}'`);
    next();
});

// Define your endpoints
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

// API endpoints for managing missing cases
app.get('/api/missingCases/search', async (req, res) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    const formattedSearchTerm = `%${searchTerm}%`;
    const query = 'SELECT * FROM missingCases WHERE LOWER(name) LIKE LOWER(?)';

    try {
        const [results] = await pool.query(query, [formattedSearchTerm]);
        res.json(results);
    } catch (err) {
        console.error('Error searching in database:', err);
        res.status(500).json({ error: 'Error during search' });
    }
});

app.post('/api/missingCases', async (req, res) => {
    const { name, age, lastSeenDate, lastSeenLocation, description, reportedDate = new Date() } = req.body;
    const query = 'INSERT INTO missingCases (name, age, lastSeenDate, lastSeenLocation, description, reportedDate) VALUES (?, ?, ?, ?, ?, ?)';

    try {
        const [result] = await pool.query(query, [name, age, lastSeenDate, lastSeenLocation, description, reportedDate]);
        res.status(201).json({ message: 'Entry added successfully', id: result.insertId });
    } catch (err) {
        console.error('Error adding to database:', err);
        res.status(500).json({ error: 'Failed to add to the database' });
    }
});

app.get('/api/missingCases', async (req, res) => {
    const query = 'SELECT * FROM missingCases';

    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching from database:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/api/missingCases/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM missingCases WHERE id = ?';

    try {
        const [results] = await pool.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error('Error fetching from database:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.patch('/api/missingCases/:id', async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'No fields provided for update' });
    }

    const setClause = Object.keys(updateFields).map(key => `${key} = ?`).join(', ');
    const queryParams = [...Object.values(updateFields), id];

    const query = `UPDATE missingCases SET ${setClause} WHERE id = ?`;

    try {
        const [result] = await pool.query(query, queryParams);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No such case found' });
        }
        res.status(200).json({ message: 'Entry updated successfully' });
    } catch (err) {
        console.error('Error updating database:', err);
        res.status(500).json({ error: 'Failed to update the database' });
    }
});

app.delete('/api/missingCases/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM missingCases WHERE id = ?';

    try {
        const [result] = await pool.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json({ message: 'Entry deleted successfully' });
    } catch (err) {
        console.error('Error deleting from database:', err);
        res.status(500).json({ error: 'Failed to delete the entry' });
    }
});

// Temporary endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint reached' });
});

// Catch-all handler to serve the React app for any other requests
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
