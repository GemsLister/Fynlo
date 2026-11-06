import { pool } from "../config/db";

async function seed() {
  console.log("Starting seed with present dates...");
  try {
    // 1. Ensure user 1 exists
    const userCheck = await pool.query(
      "SELECT id FROM users WHERE email = 'jameslopez@email.com'",
    );
    let userId = 1;
    if (userCheck.rows.length === 0) {
      const userRes = await pool.query(
        `INSERT INTO users (username, email, password) 
         VALUES ('james', 'jameslopez@email.com', '$2b$10$eXampleHashedPasswordGoesHere1234567890') 
         RETURNING id`,
      );
      userId = userRes.rows[0].id;
    } else {
      userId = userCheck.rows[0].id;
    }

    // 2. Clear old transactions and budgets for this user
    await pool.query(
      "DELETE FROM transactions WHERE user_id = $1 OR user_id IS NULL",
      [userId],
    );
    await pool.query("DELETE FROM budgets WHERE user_id = $1", [userId]);

    // 3. Seed budgets
    const budgets = [
      { category: "Housing", amount: 1500.0 },
      { category: "Food", amount: 300.0 },
      { category: "Utilities", amount: 150.0 },
      { category: "Transport", amount: 120.0 },
      { category: "Entertainment", amount: 80.0 },
      { category: "Health", amount: 100.0 },
    ];

    for (const b of budgets) {
      await pool.query(
        "INSERT INTO budgets (user_id, category, amount) VALUES ($1, $2, $3)",
        [userId, b.category, b.amount],
      );
    }

    // Helper to format date YYYY-MM-DD
    const formatDate = (year: number, month: number, day: number) => {
      const m = String(month).padStart(2, "0");
      const d = String(day).padStart(2, "0");
      return `${year}-${m}-${d}`;
    };

    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const curDay = Math.min(now.getDate(), 28);

    // Calculate dates distributed up to today
    const d1 = Math.max(1, Math.min(1, curDay));
    const d2 = Math.max(1, Math.min(2, curDay));
    const d3 = Math.max(1, Math.min(3, curDay));
    const d4 = Math.max(1, Math.min(4, curDay));
    const d5 = Math.max(1, Math.min(5, curDay));
    const d6 = curDay;

    // 4. Seed present month transactions
    const presentTransactions = [
      {
        name: "Salary Deposit",
        amount: 4200.0,
        category: "Income",
        type: "income",
        date: formatDate(curYear, curMonth, d1),
      },
      {
        name: "Rent Payment",
        amount: 1450.0,
        category: "Housing",
        type: "expense",
        date: formatDate(curYear, curMonth, d2),
      },
      {
        name: "Grocery Store",
        amount: 87.4,
        category: "Food",
        type: "expense",
        date: formatDate(curYear, curMonth, d3),
      },
      {
        name: "Freelance Project",
        amount: 950.0,
        category: "Income",
        type: "income",
        date: formatDate(curYear, curMonth, d4),
      },
      {
        name: "Electric Bill",
        amount: 112.0,
        category: "Utilities",
        type: "expense",
        date: formatDate(curYear, curMonth, d4),
      },
      {
        name: "Netflix",
        amount: 15.99,
        category: "Entertainment",
        type: "expense",
        date: formatDate(curYear, curMonth, d5),
      },
      {
        name: "Coffee Shops",
        amount: 43.5,
        category: "Food",
        type: "expense",
        date: formatDate(curYear, curMonth, d5),
      },
      {
        name: "Gym Membership",
        amount: 49.0,
        category: "Health",
        type: "expense",
        date: formatDate(curYear, curMonth, d6),
      },
      {
        name: "Dividend Payout",
        amount: 310.0,
        category: "Income",
        type: "income",
        date: formatDate(curYear, curMonth, d6),
      },
      {
        name: "Public Transit",
        amount: 78.0,
        category: "Transport",
        type: "expense",
        date: formatDate(curYear, curMonth, d6),
      },
    ];

    for (const t of presentTransactions) {
      await pool.query(
        `INSERT INTO transactions (name, amount, category, type, date, user_id) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [t.name, t.amount, t.category, t.type, t.date, userId],
      );
    }

    // 5. Seed historical monthly data for the 3 preceding months
    for (let i = 3; i >= 1; i--) {
      const prevDate = new Date(curYear, now.getMonth() - i, 1);
      const pYear = prevDate.getFullYear();
      const pMonth = prevDate.getMonth() + 1;

      const inc = 4100.0 + (3 - i) * 100.0;
      const exp = 1650.0 + (3 - i) * 35.0;

      await pool.query(
        `INSERT INTO transactions (name, amount, category, type, date, user_id) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        ["Salary Deposit", inc, "Income", "income", formatDate(pYear, pMonth, 1), userId],
      );
      await pool.query(
        `INSERT INTO transactions (name, amount, category, type, date, user_id) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        ["Monthly Expenses", exp, "Housing", "expense", formatDate(pYear, pMonth, 15), userId],
      );
    }

    console.log("Database seeded successfully with present dates!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await pool.end();
  }
}

seed();
