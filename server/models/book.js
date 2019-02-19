const mongoose = require("mongoose");
const {Schema} = mongoose;

const BookSchema = new Schema({
  title: String,  // we don't need to worry about he id, as mongo db automatically defines that field
  genre: String,
  authorId: String,
});

// model(<collection>, <schema>)
// a model refers to a collection in the mongo db, which in this case is called
// 'Book', which will contain objects that will have the schema defined by 'BookSchema'
module.exports = mongoose.model("Book", BookSchema);