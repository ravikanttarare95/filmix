import { model, Schema } from "mongoose";

// Schema: Structure

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true],
      minlength: [2],
      trim: true,
    },
    description: {
      type: String,
      required: [true],
      minlength: [10],
      trim: true,
    },
    images: {
      type: [String],
      required: [true],
    },
    category: {
      type: String,
      required: [true],
      trim: true,
    },
    director: {
      type: String,
      required: [true],
      trim: true,
    },
    releaseYear: {
      type: Number,
      required: [true],
    },
    rating: {
      type: Number,
      required: [true],
      min: [0],
      max: [5],
    },
    isDefault: { type: Boolean },
  },
  { timestamps: true } // ✅ auto adds createdAt & updatedAt
);

// A Blueprint (Schema) — describes how a car should be built.

// A Factory (Model) — takes the blueprint and actually builds, delivers, updates, or scraps cars.

const Movie = model("Movie", movieSchema); //model() :- connects the schema to a specific collection in MongoDB.
// Movie: The model name

export default Movie;
