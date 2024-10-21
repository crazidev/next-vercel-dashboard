import { Sequelize } from "sequelize";
import { initModels } from "server/database/models/init-models";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize({
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: "postgres",
  password: "4663789",
  dialect: "postgres",
});

async function init() {
  initModels(sequelize);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // var allUser = await order_items.findOne({
    //   where: {
    //     id: 1,
    //   },
    //   include: [
    //     {
    //       model: orders,
    //     },
    //   ],
    // });

    // console.log(allUser?.toJSON());
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

init();
