import { pool } from "../config/db";

export interface transactionRow {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
}

export const createTransaction = async (
  name: string,
  amount: number,
  category: string,
  date: Date,
) => {
  const res = await pool.query(
    "INSERT INTO transactions (name, amount, category, date) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, amount, category, date],
  );
  return res.rows[0];
};
