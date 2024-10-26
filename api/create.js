import fetch from 'node-fetch';

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Set up the payload from the request body
        const productData = req.body;

        // Send POST request to the PHP backend
        const response = await fetch("http://scandiweb12.000.pe/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        // Attempt to parse response as JSON
        const responseData = await response.json().catch(() => {
            throw new Error("Received non-JSON response from server.");
        });

        // Send the parsed JSON data back to the client
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Error in /api/create function:", error.message || error);
        res.status(500).json({
            error: "Failed to create product",
            details: error.message || "Unknown error occurred"
        });
    }
};
