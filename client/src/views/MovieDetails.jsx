import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router";
import StarRating from "./../components/StarRating";
import { RiEditBoxFill } from "react-icons/ri";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

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
    <div className="max-w-7xl mx-auto p-4 md:p-8 text-white min-h-screen flex justify-center items-center">
      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Poster & Gallery */}
        <div className="space-y-4">
          {images && (
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={images[imageIndex]}
                alt={title}
                className="w-full h-[400px] object-cover rounded-lg border border-gray-600"
              />

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 justify-items-center gap-3 mt-4">
                {images.slice(0, 4).map((imgUrl, index) => (
                  <img
                    key={imgUrl}
                    src={imgUrl}
                    alt={`${title}-thumb-${index}`}
                    className="h-28 object-cover rounded-md border border-gray-600 hover:scale-105 transition cursor-pointer"
                    onClick={() => {
                      setImageIndex(index);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Details */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <Link
            to={`/edit_movies/${id}`}
            className="absolute top-5 right-5 flex items-center gap-2 px-0 sm:px-3 py-0 sm:py-1.5 rounded-xs sm:rounded-full bg-gray-800 hover:bg-gray-700 transition-shadow shadow-md hover:shadow-lg cursor-pointer border border-gray-600 text-white text-sm font-medium"
          >
            <RiEditBoxFill className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline-block">Edit</span>
          </Link>

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
              size={"lg"}
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
