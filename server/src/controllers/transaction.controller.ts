import { Request, Response } from "express";
import { createTransaction } from "../models/transaction.model";

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { name, amount, category, date } = req.body;
    if (!name || !amount || !category || !date) {
      res.status(400).json({ message: "All fields are required" });
    }
    const transaction = await createTransaction(name, amount, category, date);
    res.status(201).json({ transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
