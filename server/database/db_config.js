require("dotenv").config();

const configs = {
  development: {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT),
    ssl: process.env.DATABASE_SSL == "true"
  },
  production: {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT),
    ssl: process.env.DATABASE_SSL == "true",
  },
};

module.exports = configs;
