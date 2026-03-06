import Restaurant from "../model/Restaurant.js";

export const getNearbyRestaurants = async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.body;

    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: radius
        }
      }
    });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};