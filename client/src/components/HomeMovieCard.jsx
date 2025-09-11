import React from "react";

function HomeMovieCard({ poster, title }) {
  return (
    <div className="w-40 relative">
      <img
        src={poster}
        alt="Movie Poster"
        className="w-full h-50 object-cover mx-auto border-2 ring-2 ring-white"
      />
      <p className="absolute bottom-0 text-white bg-gradient-to-t from-black to-transparent w-full truncate px-2 py-1">
        {title}
      </p>
    </div>
  );
}

export default HomeMovieCard;
