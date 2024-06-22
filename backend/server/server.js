import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from './middleware/cors.js';
import missingCasesRoutes from './routes/missingCasesRoutes.js';
import { pool } from './config/db.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors);

// Test the database connection
pool.getConnection()
    .then(connection => {
        console.log('Connected to the database.');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

// Use routes
app.use('/api/missingCases', missingCasesRoutes);

// Temporary endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Test endpoint reached' });
});

// Catch-all handler to serve the React app for any other requests
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
