import React from "react";
import { OctagonX } from "lucide-react";

function MovieCard({
  _id,
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
    <div className="p-4 border rounded-2xl shadow-md space-y-2 w-60">
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
        <span className="font-medium">{rating}</span>
        <span className="text-sm">{releaseYear}</span>
      </div>
    </div>
  );
}

export default MovieCard;
