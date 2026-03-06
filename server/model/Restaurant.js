import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
});

restaurantSchema.index({ location: "2dsphere" });

export default mongoose.model("Restaurant", restaurantSchema);