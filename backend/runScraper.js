import { scrape } from './scraper.js';
import mysql from 'mysql2/promise';

(async () => {
    console.log("Scraper is running...");

    try {
        const results = await scrape(40); // Limit to 5 records for example
        console.log("Scrape results:", results);

        if (!Array.isArray(results)) {
            throw new TypeError("Expected results to be an array");
        }

        for (const result of results) {
            try {
                const mappedData = {
                    name: result.name || '',
                    age: parseInt(result.ageNow, 10) || null,
                    lastSeenDate: formatDate(result.missingDate),
                    lastSeenLocation: result.missingFrom || '',
                    description: result.description || '',
                    reportedDate: null,
                    eyeColor: result.eyeColor || '',
                    sex: result.sex || '',
                    firstName: result.name ? result.name.split(' ')[0] : '',
                    hairColor: result.hairColor || '',
                    height: result.height || '',
                    tattoos: null,
                    hobbiesAndInterests: null,
                    identifyingMarks: null,
                    lastName: result.name ? result.name.split(' ').slice(1).join(' ') : '',
                    lastLatitude: null,
                    lastLongitude: null,
                    photo1: null,
                    tribe: result.race || '',
                    weight: parseFloat(result.weight) || null,
                    lastKnownAddress: null,
                    lastPlaceOfEmployment: null,
                    school: null,
                    temp_dateOfBirth: formatDate(result.dob),
                    dateOfBirth: formatDate(result.dob)
                };

                // Ensure column count matches value count
                if (Object.keys(mappedData).length !== 25) {
                    console.error(`Column count and value count do not match for ${result.name}: `, Object.values(mappedData));
                    continue;
                }

                // Insert the mapped data into the database
                await insertIntoDatabase(mappedData);
                console.log(`Inserted data into database for ${mappedData.name}`);
            } catch (innerError) {
                console.error(`Failed to insert data for ${result.name}:`, innerError);
            }
        }
    } catch (error) {
        console.error('Scraping error:', error);
    }

    console.log("Scraper finished successfully");
})();

function formatDate(dateString) {
    if (!dateString) return null;
    const [month, day, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

async function insertIntoDatabase(data) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'data',
        database: 'missing_person_db',
        port: 3307
    });

    const query = `INSERT INTO missingCases 
        (name, age, lastSeenDate, lastSeenLocation, description, reportedDate, eyeColor, sex, firstName, hairColor, height, tattoos, hobbiesAndInterests, identifyingMarks, lastName, lastLatitude, lastLongitude, photo1, tribe, weight, lastKnownAddress, lastPlaceOfEmployment, school, temp_dateOfBirth, dateOfBirth) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await connection.execute(query, Object.values(data));
    await connection.end();
}
