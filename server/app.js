const express = require("express");
const exGraph = require("express-graphql");
const app = express();
const schema = require("./schema/graphqlSchema");
const mongoose = require("mongoose");
// const cors = require("cors");

// app.use(cors());

mongoose.connect("mongodb://localhost/Shopbiz");
mongoose.connection
  .once("open", () => {
    console.log("connected");
  })
  .on("error", error => {
    console.log("failed to connect", error);
  });

app.use(
  "/graphiql",
  exGraph({
    schema,
    graphiql: true
  })
);


app.listen(4000, () => {
  console.log("server listening on port 4000");
});
