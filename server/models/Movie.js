import { model, Schema } from "mongoose";

const movieSchema = new Schema({
  title: { type: String },
  description: { type: String },
  images: { type: [String] },
  category: { type: String },
  director: { type: String },
  releaseYear: { type: Number },
  rating: { type: Number },
});

const Movie = model("Movie", movieSchema);

export default Movie;
