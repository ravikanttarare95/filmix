import React, { useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import { TbLibraryPlus } from "react-icons/tb";
import { X } from "lucide-react";
import Input from "./../components/Input";
import axios from "axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Button from "./../components/Button";
import Footer from "./../components/Footer";
import { useParams } from "react-router";

function EditMovies() {
  const { id } = useParams();
  const loadMovieById = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/${id}`
    );

    setMovieDetail(response.data.data);
  };

  useEffect(() => {
    loadMovieById();
  }, []);
  const navigate = useNavigate();
  const [movieDetail, setMovieDetail] = useState({
    title: "",
    description: "",
    images: [],
    category: "",
    director: "",
    releaseYear: "",
    rating: 0,
    isDefault: false,
  });
  const [newImages, setNewImages] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorImages, setErrorImages] = useState("");
  const [errorCategory, setErrorCategory] = useState("");
  const [errorDirector, setErrorDirector] = useState("");
  const [errorReleaseYear, setErrorReleaseYear] = useState("");
  const [errorRating, setErrorRating] = useState("");

  const handleUpdateMovie = async () => {
    try {
      if (
        movieDetail.title.trim() === "" ||
        movieDetail.description.trim() === "" ||
        movieDetail.category.trim() === "" ||
        movieDetail.director.trim() === "" ||
        movieDetail.releaseYear === "" ||
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
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/movies/${id}`,
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
    } else if (movieDetail.description.length > 500) {
      setErrorDescription("Description cannot be more than 500 characters");
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
    <>
      <Navbar />
      <div className="max-w-3xl  mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-red-500 pb-2 mb-2">
          🎬 Add a New Movie
        </h2>{" "}
        <div className="h-100  overflow-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateMovie();
            }}
            className="flex flex-col gap-5"
          >
            <div>
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
              {errorTitle && (
                <p className="text-red-500 text-sm">{errorTitle}</p>
              )}
            </div>

            <div>
              <textarea
                name="movie-desc"
                id="movie-desc"
                placeholder="Movie Description..."
                className="w-full h-30 p-3 rounded-md  bg-gradient-to-br from-gray-800 to-gray-700 text-white placeholder-gray-400
                 border border-gray-700 
                 focus:border-red-500 focus:ring-1 focus:ring-yellow-400
                 outline-none transition duration-300"
                value={movieDetail?.description}
                onChange={(e) =>
                  setMovieDetail({
                    ...movieDetail,
                    description: e.target.value,
                  })
                }
              ></textarea>
              {errorDescription && (
                <p className="text-red-500 text-sm">{errorDescription}</p>
              )}
            </div>

            {movieDetail.images.length !== 0 && (
              <div className="flex gap-5 flex-wrap ">
                {movieDetail.images.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <X
                      className="absolute -top-2 -right-2 text-white bg-red-500 p-1 rounded-full cursor-pointer shadow-md"
                      size={18}
                      onClick={() => {
                        if (movieDetail.isDefault)
                          return toast.error(
                            "⚠️ Default movie's images cannot be deleted!"
                          );

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
                      className="w-24 h-28 object-cover rounded-md shadow"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="relative">
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
              <TbLibraryPlus
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
                className="cursor-pointer text-yellow-300 hover:text-yellow-400 
               absolute right-3 top-1/2 -translate-y-1/2 
               text-2xl transition duration-300"
              />
              {errorImages && (
                <p className="text-red-500 text-sm">{errorImages}</p>
              )}
            </div>

            <div>
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
            </div>

            <div>
              {" "}
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
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <p className="text-black pb-1">Realese Year:</p>
                <Input
                  type="number"
                  id="release-year"
                  name="release-year"
                  placeholder=""
                  value={movieDetail?.releaseYear}
                  min={1888}
                  max={new Date().getFullYear()}
                  onInputChange={(e) => {
                    setMovieDetail({
                      ...movieDetail,
                      releaseYear: e.target.value,
                    });
                  }}
                />
                {errorReleaseYear && (
                  <p className="text-red-500 text-sm">{errorReleaseYear}</p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <p className="text-black pb-1">Ratings:</p>
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

            <Button type="submit" btnTitle=" Update Movie" />
          </form>
        </div>
      </div>
      <Toaster position="top-right" />
      <Footer customStyle={"mt-7.5!"} />
    </>
  );
}

export default EditMovies;
