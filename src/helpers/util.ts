import { Request, Response } from "express";
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const ApplicationException = require("./application.exception");
module.exports = {
  validate,
};

function validate(req: Request) {
  let toParameter = req.body.to;
  let fromParameter = req.body.from;
  let text = req.body.text;
  console.log("Text --> {}", text);
  if (toParameter === null || toParameter === undefined) {
    throw new ApplicationException("to parameter is missing");
  }
  if (fromParameter === null || fromParameter === undefined) {
    throw new ApplicationException("from parameter is missing");
  }
  if (text === null || text === undefined) {
    console.log("Error text parameter is missing ");
    throw new ApplicationException("text parameter is missing");
  }
  if (toParameter.length < 6 || toParameter.length > 16) {
    throw new ApplicationException("to parameter is invalid");
  }
  if (fromParameter.length < 6 || fromParameter.length > 16) {
    throw new ApplicationException("from parameter is invalid");
  }
  if (text.length < 1 || text.length > 120) {
    throw new ApplicationException("text parameter is invalid");
  }
}
