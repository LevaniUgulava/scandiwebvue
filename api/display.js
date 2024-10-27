import axios from 'axios';

export default async (req, res) => {
    try {
        const { data } = await axios.post('https://api.apify.com/v2/acts/apify~web-scraper/run-sync', {
            body: {
                url: 'http://scandiweb12.000.pe/display',
                headers: {
                    'Authorization': `Bearer ${process.env.APIFY_API_KEY}`,
                },
            },
        });

        res.status(200).json(data);
    } catch (error) {
        console.error("Error in /api/display with Apify:", error.message || error);
        res.status(500).json({
            error: "Failed to fetch data",
            details: error.message || "Unknown error occurred"
        });
    }
};
