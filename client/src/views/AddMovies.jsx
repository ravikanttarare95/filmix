import React, { useState } from "react";
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
  const [photos, setPhotos] = useState([]);

  const handleAddMovie = async (e) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/movies`,
      movieDetail
    );
    setTimeout(() => {
      toast.success(response.data.message);
      navigate("/movies");
    }, 1000);
  };
  return (
    <div className="max-w-150 mx-auto">
      {" "}
      <form onSubmit={handleAddMovie} className="flex flex-col gap-5">
        <Input
          type="text"
          name="movie-title"
          id="movie-title"
          placeholder="Movie Title:"
          value={movieDetail.title}
          onInputChange={(e) => {
            setMovieDetail({ ...movieDetail, title: e.target.value });
          }}
        />

        <textarea
          name="movie-desc"
          id="movie-desc"
          placeholder="Movie Description..."
          className="shadow"
          value={movieDetail.description}
          onChange={(e) => {
            setMovieDetail({ ...movieDetail, description: e.target.value });
          }}
        ></textarea>
        {/* {photos.length !== 0 && (
          <div>
            {" "}
            {photos.map(({ imageUrl, index }) => {
              return (
                <div key={imageUrl}>
                  {" "}
                  <img src={imageUrl} alt={"Movie Poster"} key={index} />
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
            setMovieDetail({
              ...movieDetail,
              images: [...movieDetail.images, e.target.value],
            });
          }}
        /> */}

        {/* <MdAddPhotoAlternate
          onClick={() => {
            setMovieDetail(setPhotos(movieDetail.images));
          }}
        /> */}
        <Input
          type="text"
          name="movie-category"
          id="movie-category"
          placeholder="Movie Category"
          value={movieDetail.category}
          onInputChange={(e) => {
            setMovieDetail({ ...movieDetail, category: e.target.value });
          }}
        />

        <Input
          type="text"
          name="director-name"
          id="director-name"
          placeholder="Director Name"
          value={movieDetail.director}
          onInputChange={(e) => {
            setMovieDetail({ ...movieDetail, director: e.target.value });
          }}
        />
        <Input
          type="number"
          id="release-year"
          name="release-year"
          placeholder=""
          value={movieDetail.releaseYear}
          onInputChange={() => {
            setMovieDetail({ ...movieDetail, releaseYear: e.target.value });
          }}
        />
        <Input
          type="number"
          id="rating"
          name="rating"
          placeholder="Movie Rating"
          value={movieDetail.rating}
          i
          onInputChange={() => {
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
