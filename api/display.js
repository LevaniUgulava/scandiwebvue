// /api/display.js
import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    const response = await fetch("http://scandiweb12.000.pe/display", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in serverless function:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
