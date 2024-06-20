import puppeteer from 'puppeteer';
import mysql from 'mysql2/promise';

// Function to convert date format from MM/DD/YYYY to YYYY-MM-DD
function formatDate(dateString) {
    if (!dateString) return null;
    const [month, day, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

async function scrape(limit) {
    const browser = await puppeteer.launch({ headless: false }); // Set headless to false to see the browser actions
    const page = await browser.newPage();

    try {
        console.log('Scraper is running...');

        await page.goto('http://missingpersons.dps.state.nm.us/mpweb/mpcity.html', { waitUntil: 'networkidle2', timeout: 60000 });
        console.log('Navigated to the city search page');

        await page.waitForSelector('form[name="form3"]', { timeout: 60000 });
        console.log('City search form found');

        await page.type('input[name="city_txt"]', 'FARMINGTON');
        console.log('Entered FARMINGTON in the city input field');

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }),
            page.click('input[type="submit"]')
        ]);
        console.log('Form submitted');

        await page.waitForSelector('table[border="1"]', { timeout: 90000 });
        console.log('Results table found');

        const links = await page.$$eval('table[border="1"] a', anchors => anchors.map(anchor => anchor.href));
        console.log('Extracted links:', links);

        const results = [];
        for (let link of links.slice(0, limit)) {
            try {
                await page.goto(link, { waitUntil: 'networkidle2', timeout: 60000 });
                console.log('Navigated to detail page:', link);

                const detail = await page.evaluate(() => {
                    const getTextByLabel = (label) => {
                        const td = Array.from(document.querySelectorAll('td')).find(td => td.textContent.trim() === label);
                        return td ? td.nextElementSibling.textContent.trim() : null;
                    };

                    const nameDetails = document.querySelector('div#MPImgTxt')?.innerText.trim() || '';
                    const [nameDetailsDate, name] = nameDetails.split(' - ');

                    // Attempting to extract the image URL correctly
                    const photoElement = document.querySelector('img');
                    let photoUrl = null;
                    if (photoElement && photoElement.src.includes('image_serv?id=')) {
                        const photoId = photoElement.src.split('id=')[1];
                        photoUrl = `http://missingpersons.dps.state.nm.us/mpweb/image_serv?id=${photoId}`;
                    }

                    return {
                        name: name || '',
                        missingDate: getTextByLabel('Date Missing:'),
                        missingFrom: getTextByLabel('Missing from:'),
                        ageThen: getTextByLabel('Age Then:'),
                        ageNow: getTextByLabel('Age Now:'),
                        description: document.querySelector('td[colspan="5"]')?.innerText.trim() || '',
                        dob: getTextByLabel('Date of Birth:'),
                        sex: getTextByLabel('Sex:'),
                        eyeColor: getTextByLabel('Eye Color:'),
                        height: getTextByLabel('Height:'),
                        weight: parseFloat(getTextByLabel('Weight:')),
                        hairColor: getTextByLabel('Hair Color:'),
                        race: getTextByLabel('Race:'),
                        photo1: photoUrl
                    };
                });

                // If the photoUrl is null, try to click the image to get the correct URL
                if (!detail.photo1) {
                    const imgElement = await page.$('img');
                    if (imgElement) {
                        await imgElement.click();
                        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });
                        detail.photo1 = await page.evaluate(() => {
                            const photoElement = document.querySelector('img');
                            return photoElement ? photoElement.src : null;
                        });
                    }
                }

                console.log('Scraped detail:', detail);

                if (detail.race && detail.race === 'American Indian/Alaskan Native') {
                    results.push(detail);
                } else {
                    console.log('Skipped profile without specified race:', detail.name);
                }
            } catch (pageError) {
                console.error('Error navigating to detail page:', link, pageError);
            }
        }

        return results;

    } catch (error) {
        console.error('Scraping error:', error);
    } finally {
        await browser.close();
    }
}

(async () => {
    console.log("Scraper is running...");

    try {
        const results = await scrape(40); // Limit to 40 records
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
                    photo1: result.photo1 || null,
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

async function insertIntoDatabase(data) {
    const connection = await mysql.createConnection({
        host: '127.0.0.1', // Using IPv4 address instead of ::1 (IPv6)
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
