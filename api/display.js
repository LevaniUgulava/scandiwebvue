import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    const response = await fetch("http://scandiweb12.000.pe/display", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Received non-JSON response");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in /api/display function:", error.message || error);
    res.status(500).json({
      error: "Failed to fetch products",
      details: error.message || "Unknown error",
    });
  }
};
