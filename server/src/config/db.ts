import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connected to Postgres");
});

pool.on("error", (error) => {
  console.error("Error connecting to Postgres:", error);
});
