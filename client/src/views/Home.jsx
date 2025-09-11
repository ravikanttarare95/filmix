import React from "react";
import Navbar from "./../components/Navbar";
import JawaanPoster from "./../assets/home-images/jawaan-movie.png";
import EndGamePoster from "./../assets/home-images/avengers-endgame.jpg";
import HomeComingPoster from "./../assets/home-images/spider-man-homecoming.jpg";
import HomeMovieCard from "./../components/HomeMovieCard";

function Home() {
  return (
    <>
      <Navbar customStyle={"bg-black/0"} />
      <div className="relative">
        <img
          src={JawaanPoster}
          alt="Movie Poster"
          className="w-full h-screen object-cover mx-auto"
        />

        <div className="flex gap-10 justify-center absolute bottom-5 left-5">
          <HomeMovieCard poster={EndGamePoster} title="Avengers: Endgame" />
          <HomeMovieCard
            poster={HomeComingPoster}
            title="Spider-Man: Homecoming"
          />
          <HomeMovieCard poster={JawaanPoster} title="Jawan" />
        </div>
      </div>

      {/* <img src={JawaanPoster} alt="Movie Poster" className="w-235 mx-auto" />
      <img
        src={HomeComingPoster}
        alt="Movie Poster"
        className="w-235 mx-auto"
      /> */}
    </>
  );
}

export default Home;
