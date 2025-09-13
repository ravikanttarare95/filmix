import React from "react";

function StarRating({ rating }) {
  let newRating = Math.floor(rating);
  return (
    <div className="flex">
      {new Array(newRating).fill(0).map((_, index) => {
        return (
          <p key={index} className="text-red-500">
            ★
          </p>
        );
      })}
      {new Array(5 - newRating).fill(0).map((_, index) => {
        return (
          <p key={index} className="text-gray-500">
            ★
          </p>
        );
      })}
    </div>
  );
}

export default StarRating;
