require("dotenv").config();

const configs = {
  development: {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    port: parseInt(process.env.MYSQL_PORT),
  },
  production: {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    port: parseInt(process.env.MYSQL_PORT),
  },
};

module.exports = configs;
