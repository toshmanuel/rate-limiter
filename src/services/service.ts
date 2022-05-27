import { NextFunction, Request } from "express";
const models = require("../models/models");
const ApplicationException = require("../helpers/application.exception");

module.exports = {
  authenticate,
  findPhoneNumber,
};

async function authenticate(username: string, password: string) {
  const account = await models.Account.findOne({
    where: { username: `${username}`, auth_id: `${password}` },
  });
  if (account) {
    const { auth_id, ...accountWithoutAuthId } = account;
    return accountWithoutAuthId;
  }
}

async function findPhoneNumber(req: any, next: NextFunction, apiName: string) {
  const toParameter: string = req.body.to as string;
  const fromParameter: string = req.body.from as string;
  const username: string = req.account.dataValues.username as string;
  const auth_id: string = req.account.dataValues.auth_id as string;
  const account: AccountType = await models.Account.findOne({
    where: { username: `${username}`, auth_id: `${auth_id}` },
  });
  const phoneBook: PhoneNumberType[] = await models.PhoneNumber.findAll({
    where: { account_id: `${account.id}` },
  });
  if (apiName === "inbound") {
    const number = phoneBook.filter(
      (p: any) => p.dataValues.number === `${toParameter}`
    );
    if (number[0]) {
      return true;
    } else {
      throw new ApplicationException("to parameter not found");
    }
  } else if (apiName === "outbound") {
    const number = phoneBook.filter(
      (p: any) => p.dataValues.number === `${fromParameter}`
    );
    if (number[0]) {
      return true;
    } else {
      throw new ApplicationException("from parameter not found");
    }
  }
}
