import { pool } from "../config/db";
import { defaultBudgets } from "./budget.model";

export interface TransactionRow {
  id: number;
  name: string;
  amount: number | string;
  category: string;
  type: "income" | "expense";
  date: string;
  user_id?: number | null;
  created_at: Date;
  updated_at: Date;
}

export type transactionRow = TransactionRow;

export const createTransaction = async (
  name: string,
  amount: number,
  category: string,
  type: string,
  date: string | Date,
  userId?: number,
) => {
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);
  const formattedType = type?.toLowerCase() === "income" ? "income" : "expense";

  const res = await pool.query(
    `INSERT INTO transactions (name, amount, category, type, date, user_id) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [name, amount, formattedCategory, formattedType, date, userId || null],
  );
  return res.rows[0];
};

export const getTransactions = async (filters: {
  userId?: number;
  type?: string;
  month?: number;
  year?: number;
}) => {
  const conditions: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (filters.userId) {
    conditions.push(`(user_id = $${paramIndex} OR user_id IS NULL)`);
    values.push(filters.userId);
    paramIndex++;
  }

  if (filters.type && filters.type !== "all") {
    conditions.push(`LOWER(type) = LOWER($${paramIndex})`);
    values.push(filters.type);
    paramIndex++;
  }

  if (filters.month) {
    conditions.push(`EXTRACT(MONTH FROM date) = $${paramIndex}`);
    values.push(filters.month);
    paramIndex++;
  }

  if (filters.year) {
    conditions.push(`EXTRACT(YEAR FROM date) = $${paramIndex}`);
    values.push(filters.year);
    paramIndex++;
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const query = `
    SELECT id, name, amount::float, category, type, TO_CHAR(date, 'YYYY-MM-DD') as date, created_at 
    FROM transactions 
    ${whereClause} 
    ORDER BY date DESC, id DESC
  `;

  const res = await pool.query(query, values);
  return res.rows;
};

export const deleteTransactionById = async (id: number, userId?: number) => {
  if (userId) {
    const res = await pool.query(
      "DELETE FROM transactions WHERE id = $1 AND (user_id = $2 OR user_id IS NULL) RETURNING *",
      [id, userId],
    );
    return res.rows[0];
  }
  const res = await pool.query(
    "DELETE FROM transactions WHERE id = $1 RETURNING *",
    [id],
  );
  return res.rows[0];
};

export const getDashboardSummary = async (
  userId?: number,
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear(),
) => {
  const userCondition = userId
    ? `AND (user_id = ${userId} OR user_id IS NULL)`
    : "";

  const incomeQuery = `
    SELECT 
      COALESCE(SUM(amount), 0)::float as total,
      COUNT(id)::int as count
    FROM transactions 
    WHERE LOWER(type) = 'income' 
      AND EXTRACT(MONTH FROM date) = $1 
      AND EXTRACT(YEAR FROM date) = $2
      ${userCondition}
  `;

  const expenseQuery = `
    SELECT 
      COALESCE(SUM(amount), 0)::float as total,
      COUNT(id)::int as count
    FROM transactions 
    WHERE LOWER(type) = 'expense' 
      AND EXTRACT(MONTH FROM date) = $1 
      AND EXTRACT(YEAR FROM date) = $2
      ${userCondition}
  `;

  const [incomeRes, expenseRes] = await Promise.all([
    pool.query(incomeQuery, [month, year]),
    pool.query(expenseQuery, [month, year]),
  ]);

  const totalIncome = incomeRes.rows[0]?.total || 0;
  const incomeSources = incomeRes.rows[0]?.count || 0;
  const totalExpenses = expenseRes.rows[0]?.total || 0;
  const expenseTransactions = expenseRes.rows[0]?.count || 0;

  const netBalance = totalIncome - totalExpenses;
  const savingsRate =
    totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0;

  return {
    netBalance,
    totalIncome,
    incomeSources,
    totalExpenses,
    expenseTransactions,
    savingsRate,
  };
};

export const getMonthlyOverviewData = async (
  userId?: number,
  targetDate = new Date(),
) => {
  const userCondition = userId
    ? `AND (user_id = ${userId} OR user_id IS NULL)`
    : "";

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Dynamically generate the last 4 months ending at the present date
  const overviewList: {
    month: string;
    monthNum: number;
    year: number;
    income: number;
    expense: number;
  }[] = [];

  for (let i = 3; i >= 0; i--) {
    const d = new Date(targetDate.getFullYear(), targetDate.getMonth() - i, 1);
    overviewList.push({
      month: monthNames[d.getMonth()],
      monthNum: d.getMonth() + 1,
      year: d.getFullYear(),
      income: 0,
      expense: 0,
    });
  }

  // Calculate start of earliest month and end of latest month
  const startDate = `${overviewList[0].year}-${String(overviewList[0].monthNum).padStart(2, "0")}-01`;
  const lastMonth = overviewList[overviewList.length - 1];
  const endDay = new Date(lastMonth.year, lastMonth.monthNum, 0).getDate();
  const endDate = `${lastMonth.year}-${String(lastMonth.monthNum).padStart(2, "0")}-${String(endDay).padStart(2, "0")}`;

  const query = `
    SELECT 
      EXTRACT(YEAR FROM date)::int as year,
      EXTRACT(MONTH FROM date)::int as month_num,
      LOWER(type) as type,
      COALESCE(SUM(amount), 0)::float as total
    FROM transactions
    WHERE date >= $1 AND date <= $2
      ${userCondition}
    GROUP BY EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date), LOWER(type)
    ORDER BY year ASC, month_num ASC
  `;

  const res = await pool.query(query, [startDate, endDate]);

  res.rows.forEach((row: any) => {
    const item = overviewList.find(
      (m) => m.year === row.year && m.monthNum === row.month_num,
    );
    if (item) {
      if (row.type === "income") {
        item.income = row.total;
      } else {
        item.expense = row.total;
      }
    }
  });

  return overviewList;
};

export const getCategoryBudgetData = async (
  userId?: number,
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear(),
) => {
  const userCondition = userId
    ? `AND (user_id = ${userId} OR user_id IS NULL)`
    : "";

  const spendingQuery = `
    SELECT 
      category,
      COALESCE(SUM(amount), 0)::float as spent
    FROM transactions
    WHERE LOWER(type) = 'expense'
      AND EXTRACT(MONTH FROM date) = $1
      AND EXTRACT(YEAR FROM date) = $2
      ${userCondition}
    GROUP BY category
  `;

  const budgetQuery = userId
    ? `SELECT category, amount::float FROM budgets WHERE user_id = $1`
    : `SELECT category, amount::float FROM budgets WHERE user_id = 1`;

  const [spendingRes, budgetRes] = await Promise.all([
    pool.query(spendingQuery, [month, year]),
    userId
      ? pool.query(budgetQuery, [userId])
      : pool.query("SELECT category, amount::float FROM budgets"),
  ]);

  const spentMap: Record<string, number> = {};
  spendingRes.rows.forEach((row: any) => {
    spentMap[row.category.toLowerCase()] = row.spent;
  });

  const budgetMap: Record<string, number> = { ...defaultBudgets };
  budgetRes.rows.forEach((row: any) => {
    budgetMap[row.category] = row.amount;
  });

  const categoryConfig = [
    { name: "Housing", key: "housing", defaultBudget: 1500, color: "#f97316" },
    { name: "Food", key: "food", defaultBudget: 300, color: "#fb923c" },
    {
      name: "Utilities",
      key: "utilities",
      defaultBudget: 150,
      color: "#eab308",
    },
    {
      name: "Transport",
      key: "transport",
      defaultBudget: 120,
      color: "#06b6d4",
    },
    {
      name: "Entertainment",
      key: "entertainment",
      defaultBudget: 80,
      color: "#a855f7",
    },
    { name: "Health", key: "health", defaultBudget: 100, color: "#10b981" },
  ];

  return categoryConfig.map((cat) => {
    const spent =
      spentMap[cat.key] ||
      (cat.key === "transport" ? spentMap["transportation"] || 0 : 0);
    const budget = budgetMap[cat.name] || cat.defaultBudget;
    const percentage =
      budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;

    return {
      name: cat.name,
      spent,
      budget,
      percentage,
      color: cat.color,
    };
  });
};
