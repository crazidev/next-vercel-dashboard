import { Options, Sequelize } from "sequelize";
import { initModels } from "./models/init-models";
import pg from "pg";
import mysql from "mysql2";
import config from "./db_config";
import logger from "@/lib/logger";

let sequelizeInstance: Sequelize | null = null;

const getSequelizeInstance = async () => {
  if (!sequelizeInstance) {
    var sequelizeConfig: Options = {
      host: config.host,
      port: config.port,
      username: config.username,
      database: config.database,
      password: config.password,
      dialect: config.dialect,
      dialectModule: pg,
      dialectOptions: config.dialectOptions,
      logging: (sql, timing) => {
        if (process.env.LOG_DATABASE_QUERIES == "true") {
          console.info(sql);
        }
      },
    };

    if (config.dialect == "mysql") {
      config.dialectModule = mysql;
    }

    sequelizeInstance = new Sequelize(sequelizeConfig);
    initModels(sequelizeInstance);

    await sequelizeInstance
      .authenticate()
      .then(() => {
        logger("Connection has been established successfully.");
      })
      .catch((error) => {
        console.error("Unable to connect to the database");
      });
  }

  return sequelizeInstance;
};

export default getSequelizeInstance;
