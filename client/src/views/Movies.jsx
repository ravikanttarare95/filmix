import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./../components/MovieCard";
import { Search as SearchIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./../components/Navbar";
import NotFoundPage from "./NotFoundPage";
import Footer from "./../components/Footer";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState([]);
  const [error, setError] = useState(null);

  const loadMovies = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies`); //-- Important--//
    setMovies(response.data.data);
    console.log(response);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const deleteMovie = async (id, index) => {
    if (index < 12) {
      return toast.error("⚠️ Default movies cannot be deleted!");
    }
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/movies/${id}`
    );
    toast.success(response.data.message);
    response && loadMovies();
  };

  const searchMovies = async () => {
    const loadingToast = toast.loading("Searching...", { id: "searching" });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/search?q=${search}`
      );
      toast.dismiss(loadingToast);

      if (response) {
        setMovies(response.data.data);
        setError("");
      }
    } catch (error) {
      setMovies([]);
      setError(error.response.data.message);
      toast.error(error.response.data.message, { id: "error" });
      toast.dismiss(loadingToast);
    }
  };

  useEffect(() => {
    searchMovies();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="sticky xl:top-11 top-23 z-52 flex items-center shadow-md rounded-full w-full md:w-1/2 mx-auto bg-gray-100 px-5 py-2 mb-15">
          <input
            type="text"
            id="seach-bar"
            placeholder="Search Movies..."
            className="outline-none flex-1 bg-transparent text-gray-800 placeholder-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className="text-red-500" />
        </div>

        {error ? <NotFoundPage /> : null}

        <div className="flex flex-wrap gap-10 max-w-6xl mx-auto justify-center">
          {movies.map((movieObj, index) => {
            const {
              _id,
              title,
              category,
              description,
              director,
              images,
              rating,
              releaseYear,
            } = movieObj;
            return (
              <MovieCard
                key={_id}
                id={_id}
                title={title}
                category={category}
                description={description}
                director={director}
                images={images}
                rating={rating}
                releaseYear={releaseYear}
                onIconClick={(e) => {
                  e.preventDefault();
                  deleteMovie(_id, index);
                }}
              />
            );
          })}
        </div>
      </div>{" "}
      <Toaster position="top-right" />
      <Footer />
    </>
  );
}

export default Movies;
