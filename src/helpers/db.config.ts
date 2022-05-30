const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
let DB_NAME = process.env.DB_NAME;
let DB_USER = process.env.DB_USER;
let DB_PASSWORD = process.env.DB_PASSWORD;
let DB_HOST = process.env.DB_HOST;

let sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  host: `${DB_HOST}`,
  dialect: "postgres",
  define: {
    timestamps: false,
  } /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connection has been established successfully");
  } catch (err) {
    console.error("Unable to connect to the database ", err);
  }
};
module.exports = {
  sequelize,
  init,
};
