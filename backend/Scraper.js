import puppeteer from "puppeteer";

async function scrape() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Navigate to the main website
        await page.goto('http://missingpersons.dps.state.nm.us/mpweb/', { waitUntil: 'networkidle2' });
        console.log('Navigated to the main website');

        // Wait for the iframe to load
        await page.waitForSelector('frame[name="links"]');
        console.log('Target iframe found');

        // Switch to the iframe context
        const targetFrame = await page.frames().find(frame => frame.name() === 'links');
        if (!targetFrame) {
            throw new Error('Target iframe not found');
        }

        // Wait for the "City" link to be present and visible
        await targetFrame.waitForSelector('a[href="mpcity.html"]', { visible: true, timeout: 30000 });
        console.log('City link found');

        // Click the "City" link
        await targetFrame.click('a[href="mpcity.html"]');
        console.log('Clicked on the City link');

        // Wait for the city search form to appear
        await targetFrame.waitForSelector('form[name="form3"]', { visible: true });
        console.log('City search form found');

        // Type "FARMINGTON" into the city input field
        await targetFrame.type('input[name="city_txt"]', 'FARMINGTON');
        console.log('Entered FARMINGTON in the city input field');

        // Submit the form
        await Promise.all([
            targetFrame.waitForNavigation({ waitUntil: 'networkidle2' }),
            targetFrame.click('input[type="submit"]')
        ]);
        console.log('Form submitted');

        // Wait for the results to load and display
        await targetFrame.waitForSelector('table#results', { timeout: 10000 });
        console.log('Results table found');

        // Extract the data
        const data = await targetFrame.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('table#results tr'));
            return rows.map(row => {
                const cells = Array.from(row.querySelectorAll('td'));
                return cells.map(cell => cell.textContent.trim());
            });
        });

        console.log('Scraped data:', data);
        return data;
    } catch (error) {
        console.error('Scraping error:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

scrape();
