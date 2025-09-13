import React from "react";

// If you have the image locally, import it here. Otherwise, use a placeholder.
import NotFoundImg from "./../assets/not-found-tv.png"; // <-- Place your 404 image here

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
      <div className="bg-gradient-to-br from-gray-900 via-red-900 to-black rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-xl">
        {/* TV Image */}
        <div className="w-full flex justify-center mb-6">
          <img
            src={NotFoundImg}
            alt="404 Not Found TV"
            className="w-72 h-56 object-cover rounded-lg shadow-lg border-4 border-red-700"
          />
        </div>
        {/* 404 Text */}
        <h1 className="text-5xl font-extrabold text-red-500 mb-2 drop-shadow-lg text-center">
          404
        </h1>
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
          Not Found
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Oops! The page you're looking for doesn't exist.
          <br />
          Try searching for a movie or return to the{" "}
          <a
            href="/"
            className="text-red-400 underline hover:text-yellow-400 transition"
          >
            Home
          </a>{" "}
          page.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
