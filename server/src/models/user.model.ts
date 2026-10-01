import { pool } from "../config/db";

export interface UserRow {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const res = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password],
  );
  return res.rows[0];
};

export const getUserById = async (id: number) => {
  const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0];
};

export const findByEmail = async (email: string) => {
  const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0];
};
