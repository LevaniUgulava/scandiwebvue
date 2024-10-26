import fetch from 'node-fetch';

export default async (req, res) => {
    try {
        const response = await fetch("http://scandiweb12.000.pe/display");

        // Check if the response status is OK (200-299)
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        // Attempt to parse the response as JSON
        const responseData = await response.json().catch(e => {
            console.error("Failed to parse JSON:", e);
            throw new Error("Received non-JSON response from server.");
        });

        // Send the JSON data if parsing was successful
        res.status(200).json(responseData);

    } catch (error) {
        // Send a JSON error response if any error occurs
        console.error("Error in /api/display function:", error.message || error);
        res.status(500).json({
            error: "Failed to fetch products",
            details: error.message || "Unknown error occurred"
        });
    }
};
