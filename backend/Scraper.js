//import puppeteer from "puppeteer";

/*async function scrape(limit= 5) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to Google and perform a search
    await page.goto('https://www.google.com');
    await page.type('input[name=q]', 'missing indigenous women');
    await page.keyboard.press('Enter');
    await page.waitForSelector('div#search'); // Wait for search results to load

    // Extract search results
    const data = await page.evaluate(() => {
        const articles = [];
        const items = document.querySelectorAll('div#search .g');
        items.forEach((item,index) => {
            if (index < limit) {
                const title = item.querySelector('h3')?.innerText;
                const link = item.querySelector('a')?.href;

                if (title && link) {
                    articles.push({ title, link });
                }

            }

        });
        return articles;
    }, limit);

    console.log(data);

    await browser.close();
    return data;
}

export default  scrape ;*/



import puppeteer from "puppeteer";

async function scrape(limit = 5) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        // Navigate to Google and wait until the network is idle
        await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });
        console.log('Navigated to Google');

        // Capture a screenshot after navigation
        await page.screenshot({ path: 'step1.png' });

        // Wait for the search textarea to appear and be visible
        await page.waitForSelector('textarea[name="q"]', { visible: true, timeout: 10000 });
        console.log('Search input found');

        // Capture a screenshot after the search input is found
        await page.screenshot({ path: 'step2.png' });

        // Type the search query into the textarea field
        await page.type('textarea[name="q"]', 'missing indigenous women');
        await page.keyboard.press('Enter');
        console.log('Search initiated');

        // Capture a screenshot after initiating the search
        await page.screenshot({ path: 'step3.png' });

        // Wait for search results to load
        await page.waitForSelector('div#search', { timeout: 10000 });
        console.log('Search results loaded');

        // Capture a screenshot after search results are loaded
        await page.screenshot({ path: 'step4.png' });

        // Extract search results
        const data = await page.evaluate((limit) => {
            const articles = [];
            const items = document.querySelectorAll('div#search .g');
            items.forEach((item, index) => {
                if (index < limit) {
                    const title = item.querySelector('h3')?.innerText;
                    const link = item.querySelector('a')?.href;
                    if (title && link) {
                        articles.push({ title, link });
                    }
                }
            });
            return articles;
        }, limit);

        console.log('Scraped data:', data);
        return data;
    } catch (error) {
        console.error('Scraping error:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

export default scrape;

