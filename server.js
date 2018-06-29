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
app.use(routes);

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// const MONGODB_URI = "mongodb://localhost/nytsearch";

// Connect to the Mongo DB
// mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://<heroku_06cb7spt>:<Max313>@ds123151.mlab.com:23151/heroku_06cb7spt" || "mongodb://localhost/nytsearch");

// Listen on port 3000
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
