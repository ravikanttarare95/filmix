import React from "react";
import { CircleX } from "lucide-react";
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
      className="relative rounded-lg shadow-lg border border-gray-600 
             bg-gradient-to-br from-gray-800 to-gray-950 
             hover:shadow-red-500/20 hover:shadow-2xl  transition w-64 group overflow-hidden"
    >
      {/* Delete Icon */}
      <CircleX
        onClick={onIconClick}
        className="absolute top-2 right-2 p-1 rounded-full 
           bg-white/90 text-red-600 hover:bg-white 
           hover:text-red-500 shadow-md 
           transition-all duration-300 cursor-pointer z-30"
      />

      {/* Image & Category */}
      <div className="relative h-70 overflow-hidden">
        <p
          className="absolute top-2 left-2 text-xs font-medium 
                       bg-yellow-500 text-gray-900 px-3 py-0.5 rounded-full shadow-md z-10"
        >
          {category}
        </p>
        <img
          src={images[0]}
          alt={title}
          className="w-full h-70 object-cover shadow-md 
                     group-hover:scale-105 transition duration-300"
        />
        <h2
          className="absolute bottom-0 text-2xl font-semibold text-white 
                       bg-gradient-to-t from-black/90 to-transparent w-full px-3 pb-0.5 
                       group-hover:text-red-400 transition"
        >
          {title}
        </h2>
      </div>

      {/* Text Content */}
      <div className="py-3 px-3 space-y-2">
        <p className="text-gray-300 text-sm line-clamp-2">{description}</p>
        <p className="text-xs text-gray-400">🎬 Directors: {director}</p>

        <div className="flex justify-between items-center pt-2">
          <StarRating rating={rating} />
          <span className="text-sm text-yellow-400 font-medium">
            {releaseYear}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
