import React, { useEffect, useState } from "react";
import axio from "axios";
import MovieCard from "./../components/MovieCard";
import axios from "axios";

function Movies() {
  const [movies, setMovies] = useState([]);
  const loadMovies = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies`); //-- Important--//
    setMovies(response.data.data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const deleteMovie = async (id) => {
    const response = await axio.delete(
      `${import.meta.env.VITE_API_URL}/movies/${id}`
    );
    response && loadMovies();
  };
  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
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
  );
}

export default Movies;
