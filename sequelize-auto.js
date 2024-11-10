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
  dbname: "hybank-new",
  user: "root",
  pass: "",
  options: {
    dialect: "mysql",
    additional: {
      timestamps: false,
      createdAt: false,
    },
  },
  autoOptions: {
    dialect: "mysql",
    ...options,
    additional: {
      timestamps: false,
      createdAt: false,
      updatedAt: false
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
  console.log(tableNames); // table list
  // console.log(data.foreignKeys); // foreign key list
  // console.log(data.text)         // text of generated files
});
