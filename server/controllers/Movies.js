import Movie from "./../models/Movie.js";

const addMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      category,
      director,
      releaseYear,
      rating,
    } = req.body; // ----> Data coming from the client side/ UI form (POST request)

    const newMovie = new Movie({
      title,
      description,
      images,
      category,
      director,
      releaseYear,
      rating,
    });

    const savedMovie = await newMovie.save();

    res.status(201).json({
      Status: "OK",
      data: savedMovie,
      message: "Movie added successfully",
    });
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({
      Status: false,
      message: "Failed to add movie",
      error: error.message,
    });
  }
};

const getMovies = async (req, res) => {
  const movies = await Movie.find();
  try {
    if (movies.length === 0)
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });

    res.json({
      success: true,
      data: movies,
      message: "Movies fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({
      Status: false,
      message: "Failed to fetch movies",
      error: error.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id); // recommended
    // OR
    // const movie = await Movie.findOne({ _id: id });
    if (!movie)
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    res.json({
      success: true,
      data: movie,
      message: "Movie fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch movie",
      error: error.message,
    });
  }
};

export { addMovie, getMovies, getMovieById };
