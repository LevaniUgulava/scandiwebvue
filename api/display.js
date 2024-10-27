const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

export default async (req, res) => {
    try {
        // Launch Puppeteer with the serverless-friendly configuration
        const browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });

        const page = await browser.newPage();

        // Navigate to the target URL
        await page.goto('http://scandiweb12.000.pe/display', { waitUntil: 'networkidle2' });

        // Extract the JSON content from the page (assuming the response is JSON text)
        const rawText = await page.evaluate(() => document.body.innerText);

        await browser.close();

        // Parse and send the JSON response
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
