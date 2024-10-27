const chromium = require('@sparticuz/chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

export default async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });

        const page = await browser.newPage();

        // Navigate to the target page with bot protection
        await page.goto('http://scandiweb12.000.pe/display', { waitUntil: 'networkidle2' });

        // Extract the text content of the page (assuming it is JSON text)
        const rawText = await page.evaluate(() => document.body.innerText);

        await browser.close();

        // Parse and return the JSON data
        const responseData = JSON.parse(rawText);
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Error in /api/display function with Puppeteer:", error.message || error);
        res.status(500).json({
            error: "Failed to fetch data",
            details: error.message || "Unknown error occurred"
        });
    }
};
