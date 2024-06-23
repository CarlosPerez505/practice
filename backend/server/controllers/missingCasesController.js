// backend/controllers/missingCasesController.js
import { pool } from '../config/db.js';

export const getMissingCaseById = async (req, res) => {
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
};

export const getAllMissingCases = async (req, res) => {
    const query = 'SELECT * FROM missingCases';

    try {
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching from database:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};
