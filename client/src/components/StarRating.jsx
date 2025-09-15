import React from "react";

function StarRating({ rating, onStarClick, size }) {
  let newRating = Math.round(rating);
  return (
    <div className="flex">
      {new Array(newRating).fill(0).map((_, index) => {
        return (
          <p
            key={index}
            className={`text-yellow-400 cursor-pointer ${
              size === "md" ? "text-xl" : size === "lg" ? "text-2xl" : ""
            }`}
            onClick={() => {
              onStarClick && onStarClick(index + 1);
            }}
          >
            ★
          </p>
        );
      })}
      {new Array(5 - newRating).fill(0).map((_, index) => {
        return (
          <p
            key={index}
            className={`text-gray-300 cursor-pointer ${
              size === "md" ? "text-xl" : size === "lg" ? "text-2xl" : ""
            }`}
            onClick={() => {
              onStarClick && onStarClick(rating + index + 1);
            }}
          >
            ★
          </p>
        );
      })}
    </div>
  );
}

export default StarRating;
