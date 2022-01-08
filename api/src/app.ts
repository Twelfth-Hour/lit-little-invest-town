import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import sequelize from "./db";
import setupDB from "./setup";

// Constants
const IS_PRODUCTION = process.env.NODE_ENV == "production";

// sync database
(async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully.");

  if (process.env.SETUP_DB === "true") {
    await setupDB();
  }
})();

// Express config
const app = express();
app.use(cors());
app.use(morgan(IS_PRODUCTION ? "combined" : "dev"));
app.use(express.json());

app.get("/", async (_, res) => {
  res.send("Hello World!");
});

export default app;
