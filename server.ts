require("rootpath")();
import { Express } from "express";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
let { init } = require("./src/helpers/db.config");
let basicAuth = require("./src/helpers/basicAuth");
let errorResponse = require("./errorHandler");
init();
dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(basicAuth);
app.use(errorResponse.errorResponse);
app.use("/api", require("./src/controller"));

const port = process.env.PROFILE == "dev" ? 5000 : process.env.SERVER_PORT;

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(port, () => {
  console.log(` ^[server]: Server is running at http://localhost:${port} `);
});
