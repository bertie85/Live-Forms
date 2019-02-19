// this is our middleware

const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors"); // this will make the back end and the front end servers able to communicate


const app = express();
const port = process.env.PORT || 5000;

// Enable cross site scripting
app.use(cors());

// Connect to the database
mongoose.connect("mongodb://administrator:m0ng0Admin@mongodb-629-0.cloudclusters.net/test-db?authSource=admin"); //live-forms-db
mongoose.connection.once("open", () => {
  console.log("Connection open");
});

// Use graphql
app.use("/graphql", graphqlHTTP({
  schema, // because of es6 we can just use this instead of doing schema: schema!
  // graphiql: true,
}));

app.listen(port, () => console.log(`Listening on port ${port}`));
