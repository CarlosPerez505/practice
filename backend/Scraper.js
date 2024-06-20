import puppeteer from 'puppeteer';
import mysql from 'mysql2/promise';

// Function to convert date format from MM/DD/YYYY to YYYY-MM-DD
function formatDate(dateString) {
    if (!dateString) return null;
    const [month, day, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

export async function scrape(limit) {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'data',
        database: 'missing_person_db',
        port: 3307
    });

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        console.log('Scraper is running...');

        await page.goto('http://missingpersons.dps.state.nm.us/mpweb/mpstate_serv', { waitUntil: 'networkidle2' });
        console.log('Navigated to the state page');

        await page.waitForSelector('table[border="1"]', { timeout: 90000 });
        console.log('Results table found');

        const links = await page.$$eval('table[border="1"] a', anchors => anchors.map(anchor => anchor.href));
        console.log('Extracted links:', links);

        const results = [];
        for (let link of links.slice(0, limit)) {
            try {
                await page.goto(link, { waitUntil: 'networkidle2' });
                console.log('Navigated to detail page:', link);

                const detail = await page.evaluate(() => {
                    const getTextByLabel = (label) => {
                        const td = Array.from(document.querySelectorAll('td')).find(td => td.textContent.trim() === label);
                        return td ? td.nextElementSibling.textContent.trim() : null;
                    };

                    const nameDetails = document.querySelector('div#MPImgTxt')?.innerText.trim() || '';
                    const [nameDetailsDate, name] = nameDetails.split(' - ');

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

                if (!detail.photo1) {
                    const imgElement = await page.$('img');
                    if (imgElement) {
                        await imgElement.click();
                        await page.waitForNavigation({ waitUntil: 'networkidle2' });
                        detail.photo1 = await page.evaluate(() => {
                            const photoElement = document.querySelector('img');
                            return photoElement ? photoElement.src : null;
                        });
                    }
                }

                console.log('Scraped detail:', detail);

                if (detail.race && detail.race.toLowerCase() === 'american indian/alaskan native') {
                    results.push(detail);
                } else {
                    console.log('Skipped profile without the specified race:', detail.name);
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
        await connection.end();
    }
}
