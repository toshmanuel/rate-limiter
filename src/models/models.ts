const { DataTypes } = require("sequelize");
const db = require("../helpers/db.config");

interface AccountType {
  id: number;
  auth_id: string;
  username: string;
}

interface PhoneNumberType {
  id: number;
  number: string;
  account_id: string;
}

const Account = db.sequelize.define(
  "account",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    auth_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "account",
  }
);

const PhoneNumber = db.sequelize.define(
  "phone_number",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "phone_number",
  }
);
Account.sync();
PhoneNumber.sync();

module.exports = {
  Account,
  PhoneNumber,
};
