import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./views/Home";
import Movies from "./views/Movies.jsx";
import AddMovies from "./views/AddMovies.jsx";
import MovieDetails from "./views/MovieDetails.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/add_movies" element={<AddMovies />} />
      <Route path="/movie_details/:id" element={<MovieDetails />} />
    </Routes>
  </BrowserRouter>
);
