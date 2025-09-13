import React, { useEffect, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { X } from "lucide-react";
import Input from "./../components/Input";
import axios from "axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Button from "./../components/Button";

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
  const [newImages, setNewImages] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorImages, setErrorImages] = useState("");
  const [errorCategory, setErrorCategory] = useState("");
  const [errorDirector, setErrorDirector] = useState("");
  const [errorReleaseYear, setErrorReleaseYear] = useState("");
  const [errorRating, setErrorRating] = useState("");

  const handleAddMovie = async () => {
    try {
      if (
        movieDetail.title.trim() === "" ||
        movieDetail.description.trim() === "" ||
        movieDetail.category.trim() === "" ||
        movieDetail.director.trim() === "" ||
        movieDetail.releaseYear.trim() === "" ||
        movieDetail.rating === ""
      ) {
        return toast.error("Please fill all the fields");
      }

      if (movieDetail.images.length === 0) {
        setErrorImages("Please add at least one image URL");
        return toast.error("Please add at least one image URL");
      } else {
        setErrorImages("");
      }
      if (
        errorTitle ||
        errorDescription ||
        errorImages ||
        errorCategory ||
        errorDirector ||
        errorReleaseYear ||
        errorRating
      ) {
        return toast.error("Please fix the errors before submitting");
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/movies`,
        movieDetail
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/movies");
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!movieDetail.title) {
      setErrorTitle("");
    } else if (movieDetail.title.length < 3) {
      setErrorTitle("Movie title must be at least 2 characters");
    } else {
      setErrorTitle("");
    }

    if (!movieDetail.description) {
      setErrorDescription("");
    } else if (movieDetail.description.length < 10) {
      setErrorDescription("Description must be at least 10 characters");
    } else {
      setErrorDescription("");
    }

    if (!movieDetail.category) {
      setErrorCategory("");
    } else if (movieDetail.category.length < 3) {
      setErrorCategory("Category must be at least 3 characters");
    } else {
      setErrorCategory("");
    }
    if (!movieDetail.director) {
      setErrorDirector("");
    } else if (movieDetail.director.length < 3) {
      setErrorDirector("Director name must be at least 3 characters");
    } else {
      setErrorDirector("");
    }
    const releaseYearNum = Number(movieDetail.releaseYear);
    if (!releaseYearNum) {
      setErrorReleaseYear("");
    } else if (
      isNaN(releaseYearNum) ||
      releaseYearNum < 1888 ||
      releaseYearNum > new Date().getFullYear()
    ) {
      setErrorReleaseYear("Please enter a valid release year");
    } else {
      setErrorReleaseYear("");
    }
    const ratingNum = Number(movieDetail.rating);
    if (ratingNum === "") {
      setErrorRating("");
    } else if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      setErrorRating("Rating must be a number between 0 and 5");
    } else {
      setErrorRating("");
    }
  }, [movieDetail]);

  return (
    <div className="max-w-150 mx-auto">
      {" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddMovie();
        }}
        className="flex flex-col gap-5"
      >
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
        {errorTitle && <p className="text-red-500 text-sm">{errorTitle}</p>}

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
        {errorDescription && (
          <p className="text-red-500 text-sm">{errorDescription}</p>
        )}

        {movieDetail.images.length !== 0 && (
          <div className="flex gap-5">
            {movieDetail.images.map((imageUrl, index) => {
              return (
                <div key={index} className="relative">
                  <X
                    className="absolute text-red-500 bg-white/50 cursor-pointer"
                    size={15}
                    onClick={() => {
                      setMovieDetail({
                        ...movieDetail,
                        images: movieDetail.images.filter(
                          (_, idx) => index !== idx
                        ),
                      });
                    }}
                  />
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
          value={newImages}
          onInputChange={(e) => {
            setNewImages(e.target.value);
          }}
        />
        {errorImages && <p className="text-red-500 text-sm">{errorImages}</p>}

        <MdAddPhotoAlternate
          onClick={() => {
            if (newImages.length === 0) {
              return toast.error("Please add proper image URL");
            }

            setMovieDetail({
              ...movieDetail,
              images: [...movieDetail.images, newImages],
            });
            setNewImages("");
            setErrorImages("");
          }}
          className="cursor-pointer"
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
        {errorCategory && (
          <p className="text-red-500 text-sm">{errorCategory}</p>
        )}

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
        {errorDirector && (
          <p className="text-red-500 text-sm">{errorDirector}</p>
        )}
        <div className="flex gap-5">
          <div className="flex flex-col w-full">
            <p>Realese Year:</p>
            <Input
              type="number"
              id="release-year"
              name="release-year"
              placeholder=""
              value={movieDetail?.releaseYear}
              min={1888}
              max={new Date().getFullYear()}
              onInputChange={(e) => {
                setMovieDetail({ ...movieDetail, releaseYear: e.target.value });
              }}
            />
            {errorReleaseYear && (
              <p className="text-red-500 text-sm">{errorReleaseYear}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <p>Ratings:</p>
            <Input
              type="number"
              id="rating"
              name="rating"
              min={0}
              max={5}
              placeholder="Movie Rating"
              value={movieDetail?.rating}
              onInputChange={(e) => {
                setMovieDetail({ ...movieDetail, rating: e.target.value });
              }}
            />

            {errorRating && (
              <p className="text-red-500 text-sm">{errorRating}</p>
            )}
          </div>
        </div>

        <Button type="submit" btnTitle=" Add Movie" />
      </form>
      <Toaster position="top-right" />
    </div>
  );
}

export default AddMovies;
