// Dependencies
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");

// Initialize Express
const PORT = process.env.PORT || 3001;

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
}

app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongo database
// Connect to the Mongo DB
// mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost:27017/nytsearch", function(err){
  console.log("Connected to Mongo");
}).catch(function(err) {
  // If an error occurred, send it to the client
  return res.json(err);
});

// Listen on port 3001
app.listen(PORT, function() {
  console.log(`🌎 App running on port ${PORT}!`);
});

// Database configuration
// const mongojs = require("mongojs");
// const databaseUrl = "nytreact";
// const collections = ["Articles"];

// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });
