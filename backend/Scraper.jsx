const puppeteer = require('puppeteer');

async function scrape() {
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
        items.forEach((item) => {
            const title = item.querySelector('h3')?.innerText;
            const link = item.querySelector('a')?.href;
            if (title && link) {
                articles.push({ title, link });
            }
        });
        return articles;
    });

    console.log(data);

    await browser.close();
    return data;
}

module.exports = { scrape };
