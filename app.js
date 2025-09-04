const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const connectDB = require("./configs/mongodb");

connectDB();

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

module.exports = app;
