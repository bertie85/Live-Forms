const mongoose = require("mongoose");
const {Schema} = mongoose;

const AuthorSchema = new Schema({
  name: String,  // we don't need to worry about he id, as mongo db automatically defines that field
  age: Number,
});

module.exports = mongoose.model("Author", AuthorSchema);