require("dotenv").config();

// postgres://postgres.jjdhbyxkgioqqezubuaj:0E6TPJR5CYScNRpQ@aws-0-us-east-1.pooler.supabase.com:6543/postgres?supa=base-pooler.x
const configs = {
  development: {
    dialect: "postgres",
    host: 'aws-0-us-east-1.pooler.supabase.com',
    username: 'postgres.jjdhbyxkgioqqezubuaj',
    password: '0E6TPJR5CYScNRpQ',
    database: 'postgres',
    port: 6543,
  },
  production: {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    port: parseInt(process.env.MYSQL_PORT),
  },
};

module.exports = configs;
