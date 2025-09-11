import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./../components/MovieCard";

import { Search as SearchIcon } from "lucide-react";

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
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/movies/search?q=${search}`
      );

      if (response) {
        setMovies(response.data.data);
        setError("");
      }
    } catch (error) {
      setMovies([]);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    searchMovies();
  }, [search]);

  return (
    <div>
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
      <p> 404 Error: {error}</p>
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
              title={title}
              category={category}
              description={description}
              director={director}
              images={images}
              rating={rating}
              releaseYear={releaseYear}
              onIconClick={() => {
                deleteMovie(_id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Movies;
