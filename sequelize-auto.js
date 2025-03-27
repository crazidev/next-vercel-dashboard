require("dotenv").config();
const SequelizeAuto = require("sequelize-auto");
const path = require("path");
const output = path.join(__dirname, "./server/database/models");

/** @type {import('sequelize-auto').AutoOptions} */
const options = {
  directory: output,
  caseFile: "l",
  caseModel: "p",
  caseProp: "c",
  lang: "ts",
  useDefine: false,
  singularize: false,
  spaces: true,
  indentation: 3,
  generateMigration: true,
  additional: {
    timestamps: false,
    createdAt: false,
  },
};

/** @type {import('./config').Config} */
const config = {
  dbname: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASS,
  host: process.env.DATABASE_HOST,
  options: {
    dialect: process.env.DATABASE_DIALECT,
    additional: {
      timestamps: false,
      createdAt: false,
    },
  },
  autoOptions: {
    dialect: process.env.DATABASE_DIALECT,
    ...options,
    additional: {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  },
};

var auto = new SequelizeAuto.SequelizeAuto(
  config.dbname,
  config.user,
  config.pass,
  config.autoOptions
);

auto.run().then((data) => {
  const tableNames = Object.keys(data.tables);
  logger(tableNames); // table list
  // logger(data.foreignKeys); // foreign key list
  // logger(data.text)         // text of generated files
});
