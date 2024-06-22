import puppeteer from 'puppeteer';

export async function scrape(limit = 300) {
    const browser = await puppeteer.launch({ headless: false }); // Set headless to false to see the browser actions
    const page = await browser.newPage();

    const allResults = [];
    const failedLinks = [];

    try {
        console.log('Scraper is running...');

        // Scrape by city
        try {
            await page.goto('http://missingpersons.dps.state.nm.us/mpweb/mpcity.html', { waitUntil: 'networkidle2', timeout: 0 });
            console.log('Navigated to the city search page');

            await page.waitForSelector('form[name="form3"]', { timeout: 0 });
            console.log('City search form found');

            await page.type('input[name="city_txt"]', 'FARMINGTON');
            console.log('Entered FARMINGTON in the city input field');

            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 0 }),
                page.click('input[type="submit"]')
            ]);
            console.log('Form submitted');

            await page.waitForSelector('table[border="1"]', { timeout: 0 });
            console.log('Results table found');

            const cityLinks = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('table[border="1"] a')).map(a => a.getAttribute('href'));
            });

            const cityResults = await scrapeDetails(page, cityLinks.slice(0, limit));
            allResults.push(...cityResults);
        } catch (error) {
            console.error('Error while scraping city data:', error);
        }

        // Scrape by state
        try {
            await page.goto('http://missingpersons.dps.state.nm.us/mpweb/mpstate_serv', { waitUntil: 'networkidle2', timeout: 0 });
            console.log('Navigated to the state search page');

            await page.waitForSelector('table[border="1"]', { timeout: 0 });
            console.log('State search results found');

            const stateLinks = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('table[border="1"] a')).map(a => a.getAttribute('href'));
            });

            const stateResults = await scrapeDetails(page, stateLinks.slice(0, limit));
            allResults.push(...stateResults);
        } catch (error) {
            console.error('Error while scraping state data:', error);
        }

        await browser.close();

        // Retry failed links
        if (failedLinks.length > 0) {
            console.log('Retrying failed links...');
            await retryFailedLinks(failedLinks, 3); // Retry each link up to 3 times
        }

        return allResults;
    } catch (error) {
        console.error('Error during scraping:', error);
        await browser.close();
        throw error;
    }
}

async function scrapeDetails(page, links) {
    const results = [];
    for (let link of links) {
        try {
            const fullLink = `http://missingpersons.dps.state.nm.us/mpweb/${link}`;
            await page.goto(fullLink, { waitUntil: 'networkidle2', timeout: 0 });
            console.log('Navigated to detail page:', fullLink);

            // Check for Oracle TNS error on the page
            const isOracleError = await page.evaluate(() => {
                return document.body.innerText.includes('TNS:no appropriate service handler found');
            });

            if (isOracleError) {
                console.error(`Oracle TNS error detected on page: ${fullLink}`);
                failedLinks.push(fullLink);
                continue; // Skip this link and continue with the next one
            }

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
                    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 0 });
                    detail.photo1 = await page.evaluate(() => {
                        const photoElement = document.querySelector('img');
                        return photoElement ? photoElement.src : null;
                    });
                }
            }

            console.log('Scraped detail:', detail);

            results.push(detail);
        } catch (error) {
            console.error(`Error while scraping detail page: ${link}`, error);
        }
    }
    return results;
}

async function retryFailedLinks(links, retries) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const results = [];

    for (let attempt = 0; attempt < retries; attempt++) {
        for (let link of links) {
            try {
                await page.goto(link, { waitUntil: 'networkidle2', timeout: 0 });
                console.log(`Retry attempt ${attempt + 1}: Navigated to detail page: ${link}`);

                const isOracleError = await page.evaluate(() => {
                    return document.body.innerText.includes('TNS:no appropriate service handler found');
                });

                if (isOracleError) {
                    console.error(`Oracle TNS error detected on page during retry: ${link}`);
                    continue; // Skip this link and try again in the next attempt
                }

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
                        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 0 });
                        detail.photo1 = await page.evaluate(() => {
                            const photoElement = document.querySelector('img');
                            return photoElement ? photoElement.src : null;
                        });
                    }
                }

                console.log('Scraped detail during retry:', detail);

                results.push(detail);
                links = links.filter(l => l !== link); // Remove the successfully processed link
            } catch (error) {
                console.error(`Error while retrying detail page: ${link}`, error);
            }
        }
        if (links.length === 0) break; // Exit if all links have been processed
        await new Promise(res => setTimeout(res, 5000)); // Delay between retries
    }

    await browser.close();
    return results;
}
