import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import transactionRoutes from "./routes/transaction.routes";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  }),
);
app.use(express.json());

// Healtch check route
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Server is running well" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);

export default app;
