// const express = require("express");

import express from "express";
import bodyParser from "body-parser";
// const bodyParser = require("body-parser");
import morgan from "morgan";
// const morgan = require("morgan");
import cors from "cors";
// const cors = require("cors");
import { response } from "express";
// const { response } = require("express");
import dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();

const app = express();
const port = process.env.port || 8080; //this might need to be 8080

// Apply middlewares
app.use(morgan("dev")); //  - this will output logging for routes fetched
app.use(bodyParser.json()); // - process request body into JSON on the fly
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());   // allows all origins
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `https://manati.ece.neu.edu/vizquery/` }));
}

// Set up routes
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
// const queryRoutes = require("./routes/query");
// import queryRoutes from "./routes/query";
import router from "./routes/query.js";

app.use("/sdss", router);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
