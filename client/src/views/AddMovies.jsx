import React, { useEffect, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import Input from "./../components/Input";
import axios from "axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

function AddMovies() {
  const navigate = useNavigate();
  const [movieDetail, setMovieDetail] = useState({
    title: "",
    description: "",
    images: [],
    category: "",
    director: "",
    releaseYear: "",
    rating: 0,
  });
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState({
    title: "",
    description: "",
    images: "",
    category: "",
    director: "",
    releaseYear: "",
    rating: "",
  });

  const handleAddMovie = async (e) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/movies`,
        movieDetail
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/movies");
      }, 1000);
    } catch (error) {}
  };

  useEffect(() => {
    if (!movieDetail.title) {
      setError({ ...error, title: "" });
    } else if (movieDetail.title.length < 3) {
      setError({
        ...error,
        title: "Movie title must be at least 2 characters",
      });
    }

    if (!movieDetail.description) {
      setError({ ...error, description: "" });
    } else if (movieDetail.description.length < 10) {
      setError({
        ...error,
        description: "Description must be at least 10 characters",
      });
    }
  }, [movieDetail]);

  return (
    <div className="max-w-150 mx-auto">
      {" "}
      <form onSubmit={handleAddMovie} className="flex flex-col gap-5">
        <Input
          type="text"
          name="movie-title"
          id="movie-title"
          placeholder="Movie Title:"
          value={movieDetail?.title}
          onInputChange={(e) => {
            setMovieDetail({ ...movieDetail, title: e.target.value });
          }}
        />
        {error.title && <p className="text-red-500 text-sm">{error.title}</p>}

        <textarea
          name="movie-desc"
          id="movie-desc"
          placeholder="Movie Description..."
          className="shadow"
          value={movieDetail?.description}
          onChange={(e) => {
            setMovieDetail({ ...movieDetail, description: e.target.value });
          }}
        ></textarea>
        {error.description && (
          <p className="text-red-500 text-sm">{error.description}</p>
        )}

        {movieDetail.images.length !== 0 && (
          <div className="flex gap-5">
            {movieDetail.images.map((imageUrl, index) => {
              return (
                <div key={index}>
                  <img
                    src={imageUrl}
                    alt={"Movie Poster"}
                    key={index}
                    className="w-20"
                  />
                </div>
              );
            })}
          </div>
        )}

        <Input
          type="text"
          name="images-url"
          id="images-url"
          placeholder="Image url"
          value={movieDetail?.images}
          onInputChange={(e) => {
            setNewImages(e.target.value);
          }}
        />

        <MdAddPhotoAlternate
          onClick={() => {
            setMovieDetail({
              ...movieDetail,
              images: [...movieDetail.images, newImages],
            });
          }}
        />

        <Input
          type="text"
          name="movie-category"
          id="movie-category"
          placeholder="Movie Category"
          value={movieDetail?.category}
          onInputChange={(e) => {
            setMovieDetail({ ...movieDetail, category: e.target.value });
          }}
        />

        <Input
          type="text"
          name="director-name"
          id="director-name"
          placeholder="Director Name"
          value={movieDetail?.director}
          onInputChange={(e) => {
            setMovieDetail({ ...movieDetail, director: e.target.value });
          }}
        />
        <Input
          type="number"
          id="release-year"
          name="release-year"
          placeholder=""
          value={movieDetail?.releaseYear}
          onInputChange={(e) => {
            setMovieDetail({ ...movieDetail, releaseYear: e.target.value });
          }}
        />
        <Input
          type="number"
          id="rating"
          name="rating"
          placeholder="Movie Rating"
          value={movieDetail?.rating}
          onInputChange={(e) => {
            setMovieDetail({ ...movieDetail, rating: e.target.value });
          }}
        />

        <button
          type="submit"
          className="cursor-pointer shadow-md shadow-black w-fit"
          onClick={(e) => {
            e.preventDefault();
            handleAddMovie();
          }}
        >
          Add Movie
        </button>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}

export default AddMovies;
