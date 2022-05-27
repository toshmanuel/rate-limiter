import { NextFunction, Request, Response } from "express";
const express = require("express");
const router = express.Router();
const utils = require("./helpers/util");
const _service = require("./services/service");
const Redis = require("ioredis");
const redis_port = process.env.REDIS_PORT || 6379;
const redis_host = process.env.REDIS_HOST || "localhost";
const redis = new Redis(redis_port, redis_host);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

module.exports = router;

router.post("/inbound", inbound);
router.post("/outbound", outbound);

async function inbound(req: Request, res: Response, next: NextFunction) {
  try {
    utils.validate(req);
    let text: string = req.body.text.trim().toUpperCase();
    let toParameter: string = req.body.to.trim().toUpperCase();
    let fromParameter: string = req.body.from.trim().toUpperCase();
    let isFound: boolean | Error = await _service.findPhoneNumber(
      req,
      next,
      "inbound"
    );
    if (isFound) {
      if (text === "STOP") {
        const redisKey = `${toParameter}:${fromParameter}`;
        await redis.set(redisKey, "1");
        await redis.expire(redisKey, 4 * 60 * 60);
      }
    } else {
      console.log("else block");
      next(isFound);
    }
    res.status(200);
    res.json({
      message: "inbound sms ok",
      error: "",
    });
  } catch (err: any) {
    res.status(500);
    res.json({
      message: err.message,
      error: "",
    });
  }
}

async function outbound(req: Request, res: Response, next: NextFunction) {
  try {
    utils.validate(req);
    let text: string = req.body.text.trim().toUpperCase();
    let toParameter: string = req.body.to.trim().toUpperCase();
    let fromParameter: string = req.body.from.trim().toUpperCase();
    let redisKey = `${toParameter}:${fromParameter}`;
    let result = await redis.get(redisKey);
    if (result != null) {
      res.status(400);
      res.json({
        message: "",
        error: `sms blocked by STOP request from ${fromParameter} to ${toParameter}`,
      });
    } else {
      let numberOfCalls = await redis.get(fromParameter);
      if (numberOfCalls != null) {
        console.log("Number  of Calls --> ", numberOfCalls);
        if (numberOfCalls > 5) {
          res.status(400);
          res.json({
            messge: "",
            error: `rate limit reached from ${fromParameter}`,
          });
        } else {
          await redis.incr(fromParameter);
        }
      } else {
        redis.set(fromParameter, 1);
        redis.expire(fromParameter, 24 * 60 * 60);
      }
    }
    await _service.findPhoneNumber(req, next, "outbound");
    res.status(200);
    res.json({
      message: "outbound sms ok",
      error: "",
    });
  } catch (err: any) {
    res.status(500);
    res.json({ message: "", error: err.message });
  }
}
