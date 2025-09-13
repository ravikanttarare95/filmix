import React from "react";

function HomeMovieCard({ poster, title, onClick }) {
  return (
    <div className="w-23 sm:w-40 relative" onClick={onClick}>
      <img
        src={poster}
        alt="Movie Poster"
        className="w-full h-30 sm:h-52 object-cover mx-auto border-2 border-gray-200 rounded-lg shadow-md transition"
      />
      <p className="absolute bottom-0 border-t-0 border-2 border-gray-200 text-white bg-gradient-to-t from-gray-900 rounded-b-lg to-transparent w-full truncate px-2 py-1 font-medium">
        {title}
      </p>
    </div>
  );
}

export default HomeMovieCard;
