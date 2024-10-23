import { Sequelize } from "sequelize";
import { initModels } from "./models/init-models";
import pg from 'pg';
import mysql from 'mysql2';

let sequelizeInstance: Sequelize | null = null;

const getSequelizeInstance = async () => {
  if (!sequelizeInstance) {
    const sequelize = new Sequelize({
      host: "localhost",
      port: 3306,
      username: "root",
      database: "hybank-new",
      password: "",
      dialect: "mysql",
      dialectModule: mysql,
    });

    initModels(sequelize);

   await sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((error) => {
        console.error("Unable to connect to the database:", error);
      });
  }
  return sequelizeInstance;
};

export default getSequelizeInstance;
