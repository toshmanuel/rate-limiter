import { NextFunction, Response, Request } from "express";
exports.errorResponse = (
  req: Request,
  res: Response,
  error: Error,
  next: NextFunction
) => {
  console.log("global error response");
  res.status(560).json({
    message: "",
    error: error.message,
  });
  next();
};
