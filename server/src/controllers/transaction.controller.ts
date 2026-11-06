import { Response } from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransactionById,
  getDashboardSummary,
  getMonthlyOverviewData,
  getCategoryBudgetData,
} from "../models/transaction.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const addTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { name, amount, category, type = "expense", date } = req.body;
    if (!name || amount === undefined || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user?.id || 1;
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    const transaction = await createTransaction(
      name,
      parsedAmount,
      category,
      type,
      date,
      userId,
    );
    res.status(201).json({ transaction });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 1;
    const { type, month, year } = req.query;

    const transactions = await getTransactions({
      userId,
      type: type ? String(type) : undefined,
      month: month ? parseInt(String(month)) : undefined,
      year: year ? parseInt(String(year)) : undefined,
    });

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const userId = req.user?.id || 1;

    const deleted = await deleteTransactionById(parseInt(id), userId);
    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSummary = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 1;
    const now = new Date();
    const month = req.query.month
      ? parseInt(String(req.query.month))
      : now.getMonth() + 1;
    const year = req.query.year
      ? parseInt(String(req.query.year))
      : now.getFullYear();

    const summary = await getDashboardSummary(userId, month, year);
    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMonthlyOverview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 1;
    const now = new Date();

    const overview = await getMonthlyOverviewData(userId, now);
    res.status(200).json({ overview });
  } catch (error) {
    console.error("Error fetching monthly overview:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategoryBudgets = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 1;
    const now = new Date();
    const month = req.query.month
      ? parseInt(String(req.query.month))
      : now.getMonth() + 1;
    const year = req.query.year
      ? parseInt(String(req.query.year))
      : now.getFullYear();

    const categories = await getCategoryBudgetData(userId, month, year);
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching category budgets:", error);
    res.status(500).json({ message: "Server error" });
  }
};
