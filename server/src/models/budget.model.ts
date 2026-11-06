import { pool } from "../config/db";

export interface BudgetRow {
  id: number;
  user_id: number;
  category: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

export const defaultBudgets: Record<string, number> = {
  Housing: 1500.0,
  Food: 300.0,
  Utilities: 150.0,
  Transport: 120.0,
  Entertainment: 80.0,
  Health: 100.0,
};

export const getBudgetsByUser = async (userId: number) => {
  const res = await pool.query(
    "SELECT * FROM budgets WHERE user_id = $1 ORDER BY id ASC",
    [userId],
  );
  return res.rows;
};

export const upsertBudget = async (
  userId: number,
  category: string,
  amount: number,
) => {
  const existing = await pool.query(
    "SELECT * FROM budgets WHERE user_id = $1 AND LOWER(category) = LOWER($2)",
    [userId, category],
  );

  if (existing.rows.length > 0) {
    const res = await pool.query(
      "UPDATE budgets SET amount = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [amount, existing.rows[0].id],
    );
    return res.rows[0];
  } else {
    const res = await pool.query(
      "INSERT INTO budgets (user_id, category, amount) VALUES ($1, $2, $3) RETURNING *",
      [userId, category, amount],
    );
    return res.rows[0];
  }
};

