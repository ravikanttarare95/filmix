import React from "react";
import { OctagonX } from "lucide-react";
import { Link } from "react-router";
import StarRating from "./StarRating";

function MovieCard({
  id,
  title,
  category,
  description,
  director,
  images,
  rating,
  releaseYear,
  onIconClick,
}) {
  return (
    <Link
      to={`/movie_details/${id}`}
      className="p-4 border rounded-2xl shadow-md space-y-2 w-60"
    >
      <OctagonX onClick={onIconClick} />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm italic">{category}</p>
      <p className="text-base">{description}</p>
      <p className="text-sm">🎬 Directed by: {director}</p>

      <img
        src={images[1]}
        alt={title}
        className="w-full h-48 object-cover rounded-lg border"
      />

      <div className="flex justify-between items-center pt-2">
        <StarRating rating={rating} />
        <span className="text-sm">{releaseYear}</span>
      </div>
    </Link>
  );
}

export default MovieCard;
