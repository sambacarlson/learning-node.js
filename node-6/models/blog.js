const mongoose = require('mongoose');

const Schema = mongoose.Schema; //contructor method

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true,
  }
}, {timestamps: true}) //timestamps: true auto generates timestamps

// the first arg (Blog in this case) will be plurarized by mongooose and the rusulting name (blogs) collection will be auto looked-up for on the db
// conventionally, the name (Blog) starts with capital letter.
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

