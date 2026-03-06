import axios from "axios";

export const getNearbyRestaurants = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.body;

    const query = `
      [out:json];
      node["amenity"="restaurant"](around:${radius},${latitude},${longitude});
      out;
    `;

    const url = "https://overpass-api.de/api/interpreter";

    const response = await axios.post(url, query, {
      headers: { "Content-Type": "text/plain" },
    });

    const restaurants = response.data.elements.map((place) => ({
      name: place.tags?.name || "Unknown Restaurant",
      latitude: place.lat,
      longitude: place.lon,
    }));

    res.json(restaurants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};