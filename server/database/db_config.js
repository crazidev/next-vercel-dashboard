require("dotenv").config();

/** @type {import('sequelize').Options} */
const configs = {
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT),
  dialectOptions: {
    ssl: process.env.DATABASE_SSL == "true" && {
      rejectUnauthorized: false,
    },
  },
};

module.exports = configs;
