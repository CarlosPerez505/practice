import express from 'express';
import mysql from 'mysql2';
import { dbConfig } from '../config.js';

const router = express.Router();

console.log('DB_USER:', dbConfig.user); // Verify the environment variable
console.log('DB_PASSWORD:', dbConfig.password); // Verify the environment variable
console.log('DB_HOST:', dbConfig.host); // Verify the environment variable

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

connection.connect(error => {
    if (error) {
        console.error('Database connection failed:', error.stack);
        return;
    }
    console.log('Connected to the database.');
});

router.get('/', (req, res) => {
    const query = `
        SELECT id, name, age, lastSeenDate, lastSeenLocation, description, reportedDate, eyeColor, sex, firstName, hairColor, height, tattoos, hobbiesAndInterests, identifyingMarks, lastName, lastLatitude, lastLongitude, photo1, tribe, weight, lastKnownAddress, lastPlaceOfEmployment, school, temp_dateOfBirth, dateOfBirth
        FROM missingCases
    `;
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

export default router;
