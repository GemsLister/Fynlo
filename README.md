
# 💳 Fynlo - Personal Budget & Finance Tracker

Fynlo is a full-stack personal budget and financial dashboard designed with a modern dark theme. It provides real-time tracking of net balance, total income, total expenses, savings rate, category-wise budgets, multi-month overview charts, and comprehensive transaction management backed by a PostgreSQL database.

---

## ✨ Features

- **📊 Financial Analytics Dashboard**:
  - **Net Balance** with savings rate indicator.
  - **Total Income & Sources** count.
  - **Total Expenses & Transaction** count.
  - **Savings Rate** calculated automatically from cash flow.
- **📈 Dynamic Monthly Overview Chart**:
  - Side-by-side vertical bar chart comparing income vs. expenses.
  - Rolling 4-month dynamic window ending at the present month.
  - Visual highlighting for the selected active month.
  - Clickable month toggles to inspect previous months.
- **🎯 Category Budget Tracking**:
  - Track spending against budgeted limits across categories (Housing, Food, Utilities, Transport, Entertainment, Health).
  - Visual color-coded progress bars and percentage indicators.
- **🧾 Transaction Management**:
  - Filter transactions by **All**, **Income**, or **Expense**.
  - Category-specific iconography and color badges.
  - Quick transaction deletion.
- **➕ Add Transaction Modal**:
  - Toggle between **Expense** and **Income**.
  - Contextual category selection (e.g., Housing, Food, Salary, Freelance).
  - Client-side validation and immediate live dashboard refresh.
- **🔐 Authentication**:
  - Secure user registration and login with bcrypt password hashing and JWT tokens.
  - Sign-out dialog with token cleanup.
- **🗓️ Present Date Awareness**:
  - Automatically adapts to the current calendar month and year dynamically.

---

## 🛠️ Tech Stack

### **Frontend (`/client`)**

- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Notifications & Dialogs:** SweetAlert2
- **HTTP Client:** Axios (with automatic Bearer token interceptor)

### **Backend (`/server`)**

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript (`tsx`)
- **Database:** PostgreSQL
- **Database Driver:** `pg` (node-postgres)
- **Migrations:** `node-pg-migrate`
- **Security & Auth:** JSON Web Tokens (JWT), bcrypt

---

## 📁 Project Structure

```text
Fynlo/
├── package.json              # Root scripts to manage both workspaces
├── README.md
├── client/                   # Frontend React + Vite application
│   ├── src/
│   │   ├── api/              # Axios configuration & interceptors
│   │   ├── assets/           # Logos and static media
│   │   ├── components/
│   │   │   ├── dashboard/    # StatCards, MonthlyOverview, BudgetByCategory, etc.
│   │   │   ├── forms/        # AddTransactionForm, AuthForm
│   │   │   ├── inputs/       # CategoryOptions, AuthInputs
│   │   │   ├── layouts/      # HeaderLayout, MainLayout, AuthLayout
│   │   │   └── ui/           # Buttons, notifications
│   │   ├── hooks/            # Custom hooks (auth, transactions)
│   │   ├── pages/            # LoginPage, RegisterPage, MainPage
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── .env
└── server/                   # Backend Express + PostgreSQL API
    ├── migrations/           # Database migration SQL files
    ├── src/
    │   ├── config/           # Database pool configuration
    │   ├── controllers/      # Transaction and Auth controllers
    │   ├── middleware/       # JWT authentication middleware
    │   ├── models/           # PostgreSQL query models (transaction, user, budget)
    │   ├── routes/           # Express router endpoints
    │   ├── utils/            # Database seed script
    │   └── server.ts         # Express server entry point
    └── .env
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/) (v14+)

---

### 1. Clone & Install Dependencies

Clone the repository and install dependencies for both the frontend and backend:

```bash
# Clone the repository
git clone https://github.com/your-username/Fynlo.git
cd Fynlo

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Return to root
cd ..
```

---

### 2. Configure Environment Variables

#### **Server Environment (`server/.env`)**

Create or update `server/.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgres://<username>:<password>@localhost:5432/fynlo_db
JWT_SECRET=your_super_secret_jwt_key_here
```

#### **Client Environment (`client/.env`)**

Create or update `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

---

### 3. Database Setup & Migrations

Make sure your PostgreSQL server is running and create the `fynlo_db` database:

```sql
CREATE DATABASE fynlo_db;
```

Run the database migrations:

```bash
cd server
npm run migrate:up
```

_(Optional)_ Seed sample present-month transactions and category budgets:

```bash
npm run seed
```

---

### 4. Running the Application

You can start both client and server from the root directory or individually:

#### **From Root Directory:**

```bash
# Start backend server
npm run dev:server

# In a separate terminal, start frontend client
npm run dev:client
```

#### **Or Separately:**

```bash
# Terminal 1 - Backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 - Frontend (http://localhost:5173)
cd client
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🔌 API Endpoints

### **Authentication** (`/api/auth`)

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| `POST` | `/api/auth/register` | Register a new user          |
| `POST` | `/api/auth/login`    | Log in and receive JWT token |

### **Transactions & Dashboard** (`/api/transaction`)

_All transaction endpoints require a valid JWT token via `Authorization: Bearer <token>` (or fallback in development)._

| Method   | Endpoint                            | Description                                               |
| -------- | ----------------------------------- | --------------------------------------------------------- | ---------------------------- |
| `GET`    | `/api/transaction/summary`          | Get net balance, total income, expenses, and savings rate |
| `GET`    | `/api/transaction/monthly-overview` | Get 4-month rolling income vs. expense totals             |
| `GET`    | `/api/transaction/category-budgets` | Get category spending against budget allocations          |
| `GET`    | `/api/transaction`                  | List transactions (supports `?type=income                 | expense&month=MM&year=YYYY`) |
| `POST`   | `/api/transaction/add-transaction`  | Create a new transaction                                  |
| `DELETE` | `/api/transaction/:id`              | Delete a transaction by ID                                |

---

## 📜 Available Scripts

| Command                | Workspace | Description                                        |
| ---------------------- | --------- | -------------------------------------------------- |
| `npm run dev:server`   | Root      | Starts Express development server with `tsx watch` |
| `npm run dev:client`   | Root      | Starts Vite frontend dev server                    |
| `npm run build:server` | Root      | Compiles server TypeScript into `dist/`            |
| `npm run build:client` | Root      | Builds client bundle with TypeScript check         |
| `npm run seed`         | Root      | Seeds PostgreSQL database with sample data         |
| `npm run migrate:up`   | `server/` | Runs pending database migrations                   |
| `npm run migrate:down` | `server/` | Reverts the latest migration                       |

---

## 📄 License

This project is open-source and available under the [ISC License](LICENSE).
