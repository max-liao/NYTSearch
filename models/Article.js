const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
var ArticleSchema = new Schema({
    id:     {type: Schema.Types.ObjectId},
    title:  { type: String, required: true },
    date:   String,
    url:    String,
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Note model
module.exports = Article;