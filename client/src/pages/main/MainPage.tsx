import { useState, useEffect, useMemo } from "react";
import api from "../../api/axios";
import { MainLayout } from "../../components/layouts/main/MainLayout";
import { AddTransactionForm } from "../../components/forms/AddTransactionForm";
import { StatCards } from "../../components/dashboard/StatCards";
import {
  MonthlyOverview,
  type MonthlyData,
} from "../../components/dashboard/MonthlyOverview";
import {
  BudgetByCategory,
  type CategoryBudget,
} from "../../components/dashboard/BudgetByCategory";
import {
  RecentTransactions,
  type Transaction,
} from "../../components/dashboard/RecentTransactions";
import { notify } from "../../components/ui/notifications/notify";

export const MainPage = () => {
  const [username] = useState<string>(() => {
    return localStorage.getItem("username")?.toLowerCase() || "james";
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Present date initialization
  const now = useMemo(() => new Date(), []);
  const currentMonthNum = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const monthNames = useMemo(
    () => [
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
    ],
    [],
  );

  const fullMonthNames = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    [],
  );

  const [monthNum, setMonthNum] = useState<number>(currentMonthNum);
  const [year, setYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${monthNames[now.getMonth()]} ${currentYear}`,
  );
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  // Dashboard Data States
  const [summary, setSummary] = useState({
    netBalance: 3624.11,
    totalIncome: 5460.0,
    incomeSources: 3,
    totalExpenses: 1835.89,
    expenseTransactions: 7,
    savingsRate: 66,
  });

  const [monthlyOverview, setMonthlyOverview] = useState<MonthlyData[]>([]);

  const [categories, setCategories] = useState<CategoryBudget[]>([
    {
      name: "Housing",
      spent: 1450.0,
      budget: 1500.0,
      percentage: 97,
      color: "#f97316",
    },
    {
      name: "Food",
      spent: 130.9,
      budget: 300.0,
      percentage: 44,
      color: "#fb923c",
    },
    {
      name: "Utilities",
      spent: 112.0,
      budget: 150.0,
      percentage: 75,
      color: "#eab308",
    },
    {
      name: "Transport",
      spent: 78.0,
      budget: 120.0,
      percentage: 65,
      color: "#06b6d4",
    },
    {
      name: "Entertainment",
      spent: 15.99,
      budget: 80.0,
      percentage: 20,
      color: "#a855f7",
    },
    {
      name: "Health",
      spent: 49.0,
      budget: 100.0,
      percentage: 49,
      color: "#10b981",
    },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all dashboard data from backend whenever month, year, filter, or refreshKey changes
  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const [summaryRes, overviewRes, budgetsRes, txRes] = await Promise.all([
          api.get("/api/transaction/summary", {
            params: { month: monthNum, year },
          }),
          api.get("/api/transaction/monthly-overview", {
            params: { year },
          }),
          api.get("/api/transaction/category-budgets", {
            params: { month: monthNum, year },
          }),
          api.get("/api/transaction", {
            params: { type: filter, month: monthNum, year },
          }),
        ]);

        if (!ignore) {
          if (summaryRes.data) setSummary(summaryRes.data);
          if (overviewRes.data?.overview)
            setMonthlyOverview(overviewRes.data.overview);
          if (budgetsRes.data?.categories)
            setCategories(budgetsRes.data.categories);
          if (txRes.data?.transactions)
            setTransactions(txRes.data.transactions);
        }
      } catch (err) {
        console.error("Failed to load dashboard data from backend:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, [monthNum, year, filter, refreshKey]);

  // Handle month selection from Monthly Overview chart
  const handleSelectMonth = (
    monthName: string,
    num: number,
    itemYear?: number,
  ) => {
    const targetYear = itemYear || year;
    setSelectedMonth(`${monthName} ${targetYear}`);
    setMonthNum(num);
    if (itemYear && itemYear !== year) {
      setYear(itemYear);
    }
  };

  // Handle transaction deletion
  const handleDeleteTransaction = async (id: number) => {
    try {
      await api.delete(`/api/transaction/${id}`);
      notify({
        title: "Transaction Deleted",
        text: "The transaction has been removed",
        icon: "info",
        confirm: true,
        cancel: false,
      });
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error("Failed to delete transaction:", err);
      notify({
        title: "Error",
        text: "Could not delete transaction",
        icon: "error",
        confirm: true,
        cancel: false,
      });
    }
  };

  return (
    <MainLayout
      username={username}
      selectedMonth={selectedMonth}
      onOpenAddTransaction={() => setIsAddModalOpen(true)}
    >
      {/* Welcome Heading Section with Present Date */}
      <div
        className={`flex flex-col gap-1 -mt-2 ${loading ? "opacity-80" : ""}`}
      >
        <h1 className="text-text-primary text-3xl font-bold tracking-tight">
          Welcome back, {username}
        </h1>
        <p className="text-text-secondary text-sm">
          {fullMonthNames[monthNum - 1] || "Current Month"} {year} · Your
          finances, at a glance.
        </p>
      </div>

      {/* 4 Stat Summary Cards */}
      <StatCards summary={summary} />

      {/* Middle Section: Monthly Overview & Category Budgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7">
          <MonthlyOverview
            data={monthlyOverview}
            selectedMonth={selectedMonth}
            onSelectMonth={handleSelectMonth}
          />
        </div>
        <div className="lg:col-span-5">
          <BudgetByCategory categories={categories} />
        </div>
      </div>

      {/* Bottom Section: Recent Transactions */}
      <RecentTransactions
        transactions={transactions}
        filter={filter}
        onFilterChange={setFilter}
        onDeleteTransaction={handleDeleteTransaction}
      />

      {/* Add Transaction Modal */}
      {isAddModalOpen && (
        <AddTransactionForm
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </MainLayout>
  );
};
