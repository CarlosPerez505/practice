import puppeteer from "puppeteer";
import mysql from 'mysql2/promise';

// Function to convert date format from MM/DD/YYYY to YYYY-MM-DD
function formatDate(dateString) {
    if (!dateString) return null;
    const [month, day, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

export async function scrape(limit) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'data',
        database: 'missing_person_db',
        port: 3307
    });

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const results = [];

    try {
        console.log('Scraper is running...');

        await page.goto('http://missingpersons.dps.state.nm.us/mpweb/mpcity.html', { waitUntil: 'networkidle2' });
        console.log('Navigated to the city search page');

        await page.waitForSelector('form[name="form3"]');
        console.log('City search form found');

        await page.type('input[name="city_txt"]', 'FARMINGTON');
        console.log('Entered FARMINGTON in the city input field');

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('input[type="submit"]')
        ]);
        console.log('Form submitted');

        await page.waitForSelector('table[border="1"]', { timeout: 60000 });
        console.log('Results table found');

        const links = await page.$$eval('table[border="1"] a', anchors => anchors.map(anchor => anchor.href));
        console.log('Extracted links:', links);

        for (let link of links.slice(0, limit)) {
            await page.goto(link, { waitUntil: 'networkidle2' });
            console.log('Navigated to detail page:', link);

            const detail = await page.evaluate(() => {
                const getTextByLabel = (label) => {
                    const td = Array.from(document.querySelectorAll('td')).find(td => td.textContent.trim() === label);
                    return td ? td.nextElementSibling.textContent.trim() : null;
                };

                const nameDetails = document.querySelector('div#MPImgTxt')?.innerText.trim() || '';
                const [nameDetailsDate, name] = nameDetails.split(' - ');

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
                    race: getTextByLabel('Race:')
                };
            });

            console.log('Scraped detail:', detail);
            results.push(detail);
        }

    } catch (error) {
        console.error('Scraping error:', error);
    } finally {
        await browser.close();
        await connection.end();
    }

    return results;
}
