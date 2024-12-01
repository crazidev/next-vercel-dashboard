import { Sequelize } from "sequelize";
import { initModels } from "./models/init-models";
import pg from "pg";
import mysql from "mysql2";
import config from "./db_config";

let sequelizeInstance: Sequelize | null = null;

const getSequelizeInstance = async () => {
  if (!sequelizeInstance) {
    sequelizeInstance = new Sequelize({
      host: config.host,
      port: config.port,
      username: config.username,
      database: config.database,
      password: config.password,
      dialect: config.dialect,
      dialectModule: config.dialect == "mysql" ? mysql : pg,
      dialectOptions: config.dialectOptions,
      logging: (sql, timing) => {
        if (process.env.LOG_DATABASE_QUERIES == "true") {
          console.info(sql);
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
