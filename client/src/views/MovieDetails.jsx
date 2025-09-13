import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import StarRating from "./../components/StarRating";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const findMovieDetails = async () => {
    const loadingMovie = toast.loading("Loading Movie Details...");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/${id}`
    );
    response && setMovieDetails(response.data.data);
    toast.dismiss(loadingMovie);
  };

  const changeRating = async (newRating) => {
    setMovieDetails({ ...movieDetails, rating: newRating });
    await axios.patch(`${import.meta.env.VITE_API_URL}/movies/${id}`, {
      rating: newRating,
    });
  };

  useEffect(() => {
    findMovieDetails();
  }, [id]);

  if (!movieDetails) return <p className="text-center py-10">Loading...</p>;

  const {
    title,
    category,
    description,
    director,
    images,
    rating,
    releaseYear,
  } = movieDetails;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 text-white">
      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Poster & Gallery */}
        <div className="space-y-4">
          {images && (
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={images[0]}
                alt={title}
                className="w-full h-[400px] object-cover rounded-lg"
              />

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {images.slice(0, 3).map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`${title}-thumb-${index}`}
                    className="h-28 object-cover rounded-md border border-gray-700 hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Details */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-red-400">
            {title}
          </h2>
          <p className="inline-block text-sm bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-medium">
            {category}
          </p>

          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>

          <p className="text-gray-400 text-sm">🎬 Directed by: {director}</p>
          <p className="text-gray-400 text-sm">
            📅 Release Year: {releaseYear}
          </p>
          <div className="flex items-center gap-3">
            <StarRating
              rating={rating}
              onStarClick={(newRating) => changeRating(newRating)}
            />
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default MovieDetails;
