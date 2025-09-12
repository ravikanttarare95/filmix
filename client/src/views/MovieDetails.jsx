import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  //   Best practice

  // For arrays → start with []
  // For objects (single entity) → start with null
  const findMovieDetails = async () => {
    const loadingMovie = toast.loading("Loading Movie Details...");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/${id}`
    );
    response && setMovie(response.data.data);
    toast.dismiss(loadingMovie);
  };

  useEffect(() => {
    findMovieDetails();
  }, [id]);
  if (!movie) return <p>Loading...</p>;
  const {
    title,
    category,
    description,
    director,
    images,
    rating,
    releaseYear,
  } = movie;
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
              {images.map((imgUrl, index) => {
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

        <p>{rating}</p>
        <p>{releaseYear}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
