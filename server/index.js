// Import required modules
import express from "express"; // Express framework for building the web server
import cors from "cors"; // CORS middleware to allow cross-origin requests
import dotenv from "dotenv"; // dotenv to load environment variables from a .env file
import mongoose from "mongoose"; // Mongoose for connecting and working with MongoDB

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
  // Use mongoose to connect to the MongoDB URL specified in environment variables
  const connect = await mongoose.connect(process.env.MONGODB_URL);

  // process is a global object inn Node.js.
  /*  process.env
      env is a property of process.
      It is an object containing the environment variables of the system/process.*/

  if (connect) {
    console.log("\n📶 MongoDB connected");
  }
};

app.get("/health", (req, res) => {
  // Respond with JSON indicating the server is working
  res.json({ status: "OK", message: "Server is healthy" });
  // Converts the provided JavaScript object or array into a JSON string (using JSON.stringify() internally).
});

// Define the port on which the server should run
// It first checks if PORT is defined in environment variables, otherwise defaults to 8080
const PORT = process.env.PORT || 8080;

// Start the server and listen for incoming requests on the defined port
app.listen(PORT, () => {
  console.log(`\n📞 Server is listening on ${PORT}`);

  connectDB();
});
