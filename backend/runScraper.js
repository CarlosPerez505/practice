import { scrape } from './scraper.js';
import mysql from 'mysql2/promise';

(async () => {


    try {
        const results = await scrape(300);
        console.log("Scrape results:", results);

        if (!Array.isArray(results)) {
            throw new TypeError("Expected results to be an array");
        }

        const allData = [];
        for (const result of results) {
            try {
                if (result.race && result.race.includes('American Indian/Alaskan Native')) {
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
                        photo1: result.photo1 || null,
                        tribe: result.race || '',
                        weight: parseFloat(result.weight) || null,
                        lastKnownAddress: null,
                        lastPlaceOfEmployment: null,
                        school: null,
                        temp_dateOfBirth: formatDate(result.dob),
                        dateOfBirth: formatDate(result.dob)
                    };

                    allData.push(Object.values(mappedData));
                }
            } catch (innerError) {
                console.error(`Failed to process data for ${result.name}:`, innerError);
            }
        }

        if (allData.length > 0) {
            await insertIntoDatabase(allData);
            console.log(`Inserted ${allData.length} records into database`);
        } else {
            console.log('No data to insert');
        }

    } catch (error) {
        console.error('Scraping error:', error);
    }

    console.log("Scraper finished successfully");
})();

async function insertIntoDatabase(data) {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'data',
        database: 'missing_person_db',
        port: 3306
    });

    const query = `INSERT INTO missingCases 
        (name, age, lastSeenDate, lastSeenLocation, description, reportedDate, eyeColor, sex, firstName, hairColor, height, tattoos, hobbiesAndInterests, identifyingMarks, lastName, lastLatitude, lastLongitude, photo1, tribe, weight, lastKnownAddress, lastPlaceOfEmployment, school, temp_dateOfBirth, dateOfBirth) 
        VALUES ? 
        ON DUPLICATE KEY UPDATE 
        age = VALUES(age),
        lastSeenDate = VALUES(lastSeenDate),
        lastSeenLocation = VALUES(lastSeenLocation),
        description = VALUES(description),
        reportedDate = VALUES(reportedDate),
        eyeColor = VALUES(eyeColor),
        sex = VALUES(sex),
        firstName = VALUES(firstName),
        hairColor = VALUES(hairColor),
        height = VALUES(height),
        tattoos = VALUES(tattoos),
        hobbiesAndInterests = VALUES(hobbiesAndInterests),
        identifyingMarks = VALUES(identifyingMarks),
        lastLatitude = VALUES(lastLatitude),
        lastLongitude = VALUES(lastLongitude),
        photo1 = VALUES(photo1),
        tribe = VALUES(tribe),
        weight = VALUES(weight),
        lastKnownAddress = VALUES(lastKnownAddress),
        lastPlaceOfEmployment = VALUES(lastPlaceOfEmployment),
        school = VALUES(school),
        temp_dateOfBirth = VALUES(temp_dateOfBirth),
        dateOfBirth = VALUES(dateOfBirth)`;

    try {
        await connection.query(query, [data]);
    } catch (error) {
        await handleSQLException(error);
    } finally {
        await connection.end();
    }
}

async function handleSQLException(error) {
    if (error.code === 'ER_PARSE_ERROR') {
        console.error('SQL Syntax Error:', error.message);
    } else if (error.code === 'ER_DUP_ENTRY') {
        console.error('Duplicate Entry Error:', error.message);
    } else if (error.code === 'ER_BAD_DB_ERROR') {
        console.error('Database does not exist:', error.message);
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error('Access denied for user:', error.message);
    } else {
        console.error('SQL Error:', error.message);
    }
}

function formatDate(dateString) {
    if (!dateString) return null;
    const [month, day, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}
