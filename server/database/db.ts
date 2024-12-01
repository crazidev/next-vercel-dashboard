import { Sequelize } from "sequelize";
import { initModels } from "./models/init-models";
import pg from "pg";
import mysql from "mysql2";

let sequelizeInstance: Sequelize | null = null;

const getSequelizeInstance = async () => {
  if (!sequelizeInstance) {
    sequelizeInstance = new Sequelize({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT ?? "3306"),
      username: process.env.DATABASE_USER ?? "root",
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASS ?? "",
      dialect: process.env.DATABASE_DIALECT ?? ("mysql" as any),
      dialectModule: process.env.DATABASE_DIALECT == "mysql" ? mysql : pg,
      ssl: process.env.DATABASE_SSL == "true",
      logging: (sql, timing) => {
        if (process.env.LOG_DATABASE_QUERIES ?? true) {
          // console.info(sql);
        }
      },
    });

    initModels(sequelizeInstance);

    await sequelizeInstance
      .authenticate()
      .then(() => {
        // console.log("Connection has been established successfully.");
      })
      .catch((error) => {
        console.error("Unable to connect to the database");
      });
  }

  return sequelizeInstance;
};

export default getSequelizeInstance;
