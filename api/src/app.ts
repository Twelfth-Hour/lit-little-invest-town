import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";

// Constants
const IS_PRODUCTION = process.env.NODE_ENV == "production";

// Express config
const app = express();
app.use(cors());
app.use(morgan(IS_PRODUCTION ? "combined" : "dev"));
app.use(express.json());

app.get("/", async (_, res) => {
  res.send("Hello World!");
});

export default app;
