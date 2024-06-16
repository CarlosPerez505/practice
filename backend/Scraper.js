import puppeteer from "puppeteer";

async function scrape() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Navigate directly to the city search page
        await page.goto('http://missingpersons.dps.state.nm.us/mpweb/mpcity.html', { waitUntil: 'networkidle2' });
        console.log('Navigated to the city search page');

        // Wait for the form to load
        await page.waitForSelector('form[name="form3"]');
        console.log('City search form found');

        // Type "FARMINGTON" into the city input field
        await page.type('input[name="city_txt"]', 'FARMINGTON');
        console.log('Entered FARMINGTON in the city input field');

        // Submit the form
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            page.click('input[type="submit"]')
        ]);
        console.log('Form submitted');

        // Wait for the results to load and display
        await page.waitForSelector('table[border="1"]');
        console.log('Results table found');

        // Extract the data
        const data = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('table[border="1"] tr'));
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

