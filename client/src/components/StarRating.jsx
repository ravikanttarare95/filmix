import React from "react";

function StarRating({ rating }) {
  return (
    <div className="flex">
      {new Array(rating).fill(0).map((_, index) => {
        return (
          <p key={index} className="text-red-500">
            ★
          </p>
        );
      })}
      {new Array(5 - rating).fill(0).map((_, index) => {
        return (
          <p key={index} className="text-white">
            ★
          </p>
        );
      })}
    </div>
  );
}

export default StarRating;
