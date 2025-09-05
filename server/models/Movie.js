import { model, Schema } from "mongoose";

// Schema: Structure

const movieSchema = new Schema({
  title: { type: String },
  description: { type: String },
  images: { type: [String] },
  category: { type: String },
  director: { type: String },
  releaseYear: { type: Number },
  rating: { type: Number },
});

const Movie = model("Movie", movieSchema); //model() :- connects the schema to a specific collection in MongoDB.
// Movie: The model name 

export default Movie;
