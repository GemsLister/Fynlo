import { addTransaction } from "../controllers/transaction.controller";
import express from "express";

const router = express.Router();

router.post("/add-transaction", addTransaction);

export default router;
