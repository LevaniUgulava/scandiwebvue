import fetch from 'node-fetch';

export default async (req, res) => {
    try {
        const response = await fetch("http://scandiweb12.000.pe/display");

        // Capture and log raw response text
        const rawText = await response.text();
        console.log("Raw response from server:", rawText);

        // Attempt JSON parsing
        const responseData = JSON.parse(rawText);
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Error processing JSON response:", error.message || error);
        res.status(500).json({
            error: "Failed to fetch data",
            details: error.message || "Unknown error occurred"
        });
    }
};
