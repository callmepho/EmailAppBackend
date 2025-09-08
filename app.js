const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const connectDB = require("./configs/mongodb");
const authMiddleware = require("./middlewares/authMiddleware");

connectDB();

const app = express();

app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: authMiddleware(req),
  }))
);

module.exports = app;
