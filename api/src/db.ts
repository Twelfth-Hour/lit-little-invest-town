import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const DB_NAME = process.env.DB_NAME || "";
const DB_USER = process.env.DB_USER || "";
const DB_PASS = process.env.DB_PASS || "";
const DB_HOST = process.env.DB_HOST || "";
const DB_PORT = process.env.DB_PORT || "";

// Database Connection
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`User: ${DB_USER}, DB: ${DB_NAME}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;
