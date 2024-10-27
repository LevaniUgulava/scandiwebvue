import fetch from 'node-fetch';

export default async (req, res) => {
    try {
        const response = await fetch("http://scandiweb12.000.pe/display");

        // Log raw response for troubleshooting
        const rawText = await response.text();
        console.log("Raw response from backend:", rawText);

        // Parse the raw text if it's JSON, otherwise handle as error
        let responseData;
        try {
            responseData = JSON.parse(rawText);
        } catch (parseError) {
            throw new Error("Server response is not valid JSON: " + rawText);
        }

        res.status(200).json(responseData);

    } catch (error) {
        console.error("Error in /api/display function:", error.message || error);
        res.status(500).json({
            error: "Failed to fetch data",
            details: error.message || "Unknown error occurred"
        });
    }
};
