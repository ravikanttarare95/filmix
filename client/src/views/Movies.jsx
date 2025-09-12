import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./../components/MovieCard";
import { Search as SearchIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./../components/Navbar";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState([]);
  const [error, setError] = useState(null);

  const loadMovies = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies`); //-- Important--//
    setMovies(response.data.data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const deleteMovie = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/movies/${id}`
    );
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
      <div className="shadow rounded-full w-fit py-2 px-5">
        <input
          type="text"
          id="seach-bar"
          placeholder="Search Movies... "
          className="outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <SearchIcon className="inline-block" />
      </div>
      {error ? <p> 404 Error: {error}</p> : null}
      {/* need to design proper 404 page */}

      <div className="flex flex-wrap gap-4 justify-center p-4">
        {movies.map((movieObj, _) => {
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

                deleteMovie(_id);
              }}
            />
          );
        })}
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default Movies;
