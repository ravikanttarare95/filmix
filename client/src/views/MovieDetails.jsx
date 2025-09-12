import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import StarRating from "./../components/StarRating";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  //   Best practice

  // For arrays → start with []
  // For objects (single entity) → start with null
  const findMovieDetails = async () => {
    const loadingMovie = toast.loading("Loading Movie Details...");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/${id}`
    );
    response && setMovieDetails(response.data.data);
    toast.dismiss(loadingMovie);
  };

  useEffect(() => {
    findMovieDetails();
  }, [id]);
  if (!movieDetails) return <p>Loading...</p>;
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
    <div className="flex">
      <div>
        {images && (
          <div className="relative">
            <img
              src={images[0]}
              alt={title}
              className="w-200 h-150 object-cover"
            />
            <div className="flex gap-5 justify-center absolute bottom-2 right-0 left-0">
              {" "}
              {images.slice(0, 3).map((imgUrl, index) => {
                return (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={title}
                    className="w-40 h-50 object-cover"
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div>
        <h2>{title}</h2>
        <p>{category}</p>
        <p>{description}</p>
        <p>{director}</p>

        <StarRating rating={rating} />
        <p>{releaseYear}</p>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default MovieDetails;
