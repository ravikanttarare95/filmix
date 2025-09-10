// Import required modules
import express from "express"; // Express framework for building the web server
import cors from "cors"; // CORS middleware to allow cross-origin requests
import dotenv from "dotenv"; // dotenv to load environment variables from a .env file
import mongoose from "mongoose"; // Mongoose for connecting and working with MongoDB
import Movie from "./models/Movie.js";
import {
  addMovie,
  getMovies,
  getMovieById,
  getMoviesSearch,
  putMovieById,
} from "./controllers/Movies.js";

// Load environment variables from .env file into process.env
dotenv.config();

// Create an instance of the Express application
const app = express();

/* Middleware to parse incoming JSON data when the client sends data in JSON format, usually in the request body).
It converts that JSON data into a regular JavaScript object. 
Once parsed, the resulting object is available in req.body. */
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Use mongoose to connect to the MongoDB URL specified in environment variables
    const connect = await mongoose.connect(process.env.MONGODB_URL);

    // process is a global object inn Node.js.
    /*  process.env
      env is a property of process.
      It is an object containing the environment variables of the system/process.*/

    if (connect) {
      console.log("\n📶 MongoDB connected");
    }
  } catch (error) {
    console.error(`\n❌ MongoDB connection error:${error.message}`);
  }
};

app.get("/", (req, res) => {
  // Respond with JSON indicating the server is working
  res.json({ status: "OK", message: "Server is healthy" });
  //res.json() Converts the provided JavaScript object or array into a JSON string (using JSON.stringify() internally).
});

app.post("/movies", addMovie);

app.get("/movies/search", getMoviesSearch);

app.get("/movies", getMovies);

app.get("/movies/:id", getMovieById);

app.put("/movies/:id", putMovieById);

const PORT = process.env.PORT || 8080;

// Start the server and listen for incoming requests on the defined port
app.listen(PORT, () => {
  console.log(`\n📞 Server is listening on ${PORT}`);

  connectDB();
});
