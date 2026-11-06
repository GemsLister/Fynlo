import express from "express";
import {
  addTransaction,
  getAllTransactions,
  deleteTransaction,
  getSummary,
  getMonthlyOverview,
  getCategoryBudgets,
} from "../controllers/transaction.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/add-transaction", authenticateToken, addTransaction);
router.get("/", authenticateToken, getAllTransactions);
router.delete("/:id", authenticateToken, deleteTransaction);
router.get("/summary", authenticateToken, getSummary);
router.get("/monthly-overview", authenticateToken, getMonthlyOverview);
router.get("/category-budgets", authenticateToken, getCategoryBudgets);

export default router;
