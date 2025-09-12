import React from "react";

function StarRating({ rating }) {
  return (
    <div className="flex">
      {rating}
      {new Array(rating).fill(0).map(() => {
        return <p className="text-red-500">★</p>;
      })}
      {new Array(5 - rating).fill(0).map(() => {
        return <p className="text-white">★</p>;
      })}
    </div>
  );
}

export default StarRating;
