import { pool } from '../config/db.js';

export const searchMissingCases = async (req, res) => {
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
};

export const addMissingCase = async (req, res) => {
    const { name, age, lastSeenDate, lastSeenLocation, description, reportedDate = new Date() } = req.body;
    const query = 'INSERT INTO missingCases (name, age, lastSeenDate, lastSeenLocation, description, reportedDate) VALUES (?, ?, ?, ?, ?, ?)';

    try {
        const [result] = await pool.query(query, [name, age, lastSeenDate, lastSeenLocation, description, reportedDate]);
        res.status(201).json({ message: 'Entry added successfully', id: result.insertId });
    } catch (err) {
        console.error('Error adding to database:', err);
        res.status(500).json({ error: 'Failed to add to the database' });
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

export const updateMissingCase = async (req, res) => {
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
};

export const deleteMissingCase = async (req, res) => {
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
};
