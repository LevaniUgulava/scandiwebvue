const puppeteer = require('puppeteer');

export default async (req, res) => {
    try {
        // Launch Puppeteer
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required for Vercel or serverless environments
        });

        const page = await browser.newPage();

        // Visit the target URL
        await page.goto('http://scandiweb12.000.pe/display', {
            waitUntil: 'networkidle2' // Wait until all network requests are done
        });

        // Extract JSON directly from the page
        const rawText = await page.evaluate(() => document.body.innerText);

        // Close Puppeteer
        await browser.close();

        // Parse and send the JSON response
        const responseData = JSON.parse(rawText);
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Error fetching data with Puppeteer:", error.message);
        res.status(500).json({
            error: "Failed to fetch data",
            details: error.message
        });
    }
};
