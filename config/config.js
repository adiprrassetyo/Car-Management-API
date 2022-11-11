require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT, DB_URL } =
  process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  production: {
    url: DB_URL,
    // dialect: DB_DIALECT,
    // username: DB_USERNAME,
    // password: DB_PASSWORD,
    // host: DB_HOST,
  },
};
