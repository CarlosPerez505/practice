import { scrape } from './scraper.js';
import mysql from 'mysql2/promise';

(async () => {
    console.log("Scraper is running...");

    const failedLinks = []; // Define the failedLinks array here

    try {
        // Execute the scrape function to get the results, limited to 300 records
        const results = await scrape(300);
        console.log("Scrape results:", results);

        // Check if the results are an array
        if (!Array.isArray(results)) {
            throw new TypeError("Expected results to be an array");
        }

        // Array to hold the processed data
        const allData = [];
        for (const result of results) {
            try {
                // Check if the tribe affiliation is Native American
                if (result.race && result.race.includes('American Indian/Alaskan Native')) {
                    // Map the result to the desired database format
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

                    // Add the mapped data to the allData array
                    allData.push(Object.values(mappedData));
                }
            } catch (innerError) {
                console.error(`Failed to process data for ${result.name}:`, innerError);
            }
        }

        // Check if allData is not empty before inserting into the database
        if (allData.length > 0) {
            await insertIntoDatabase(allData);
            console.log(`Inserted ${allData.length} records into database`);
        } else {
            console.log('No data to insert');
        }

        // Retry failed links after a timeout of 15 seconds
        if (failedLinks.length > 0) {
            console.log('Retrying failed links after 15 seconds...');
            await new Promise(resolve => setTimeout(resolve, 15000)); // 15-second timeout
            const retriedResults = await retryFailedLinks(failedLinks, 3); // Retry each link up to 3 times
            allResults.push(...retriedResults);
        }

    } catch (error) {
        console.error('Scraping error:', error);
    }

    console.log("Scraper finished successfully");
})();

// Function to insert data into the database
async function insertIntoDatabase(data) {
    let connection;
    try {
        // Create a new MySQL connection
        connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'data',
            database: 'missing_person_db',
            port: 3306
        });

        // SQL query for inserting data into the missingCases table with ON DUPLICATE KEY UPDATE
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

        // Execute the query with the data
        await connection.query(query, [data]);
    } catch (error) {
        // Handle any SQL exceptions that occur during the query execution
        await handleSQLException(error);
    } finally {
        // Close the MySQL connection if it was successfully created
        if (connection) {
            await connection.end();
        }
    }
}

// Function to handle SQL exceptions
async function handleSQLException(error) {
    // Check the error code and log an appropriate message
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

// Function to format a date string from MM/DD/YYYY to YYYY-MM-DD
function formatDate(dateString) {
    if (!dateString) return null; // Return null if the date string is empty or undefined
    const [month, day, year] = dateString.split('/'); // Split the date string into components
    return `${year}-${month}-${day}`; // Return the formatted date string
}

// Define the retryFailedLinks function
async function retryFailedLinks(links, retries) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const results = [];

    for (let attempt = 0; attempt < retries; attempt++) {
        for (let link of links) {
            try {
                await retryNavigate(page, link, retries); // Retry up to 3 times
                console.log(`Retrying to navigate to ${link}, attempt ${attempt + 1}`);
                results.push(link);
            } catch (error) {
                console.error(`Failed to navigate to ${link} after ${retries} attempts`);
            }
        }
    }

    await browser.close();
    return results;
}

async function retryNavigate(page, url, retries) {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
            return;
        } catch (error) {
            if (attempt < retries - 1) {
                console.log(`Retrying to navigate to ${url}, attempt ${attempt + 1}`);
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000 + 15000)); // Exponential backoff + 15-second delay
            } else {
                console.error(`Failed to navigate to ${url} after ${retries} attempts`);
                throw error;
            }
        }
    }
}
