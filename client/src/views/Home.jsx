import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./../components/Navbar";
import JawaanPoster from "./../assets/home-images/jawaan-movie.png";
import EndGamePoster from "./../assets/home-images/avengers-endgame.jpg";
import HomeComingPoster from "./../assets/home-images/spider-man-homecoming.png";
import HomeMovieCard from "./../components/HomeMovieCard";
import Button from "./../components/Button";

function Home() {
  const [homeWallpaper, setHomeWallpaper] = useState(EndGamePoster);
  const navigate = useNavigate();
  return (
    <>
      <Navbar customStyle="bg-black/0 fixed! shadow-none backdrop-blur-none!" />
      <div className="relative h-screen w-full">
        <img
          src={homeWallpaper}
          alt="Movie Poster"
          className="w-full h-screen object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent z-10" />

        {/* Hero Text */}
        <div className="absolute top-1/3 left-8 z-20 max-w-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-4">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-500 to-red-500 ">
              Filmix
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-5">
            Discover, rate, and explore your favorite movies in a{" "}
            <span className="text-yellow-400 font-semibold">modern</span>,
            vibrant interface.
          </p>
          <Button
            btnTitle={"Browse Movies"}
            onBtnClick={() => {
              navigate("/movies");
            }}
          />
        </div>

        {/* Featured Movie Cards */}
        <div className="absolute bottom-20 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex gap-3 sm:gap-6 md:gap-10 justify-center">
          <HomeMovieCard
            poster={EndGamePoster}
            title="Avengers: Endgame"
            onClick={() => {
              setHomeWallpaper(EndGamePoster);
            }}
          />
          <HomeMovieCard
            poster={HomeComingPoster}
            title="Spider-Man: Homecoming"
            onClick={() => {
              setHomeWallpaper(HomeComingPoster);
            }}
          />
          <HomeMovieCard
            poster={JawaanPoster}
            title="Jawan"
            onClick={() => {
              setHomeWallpaper(JawaanPoster);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
