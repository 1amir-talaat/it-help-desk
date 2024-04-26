import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/routes.js";
import * as model from "./models/models.js";
import db from "./database/connection.js";

async function initializeDatabase() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    await db.sync({ force: false });

    console.log("Models synchronized with the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

initializeDatabase();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(5000, () => console.log("Server running at port 5000"));
