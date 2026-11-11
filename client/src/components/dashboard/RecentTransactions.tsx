import {
  ArrowUp,
  Home,
  ShoppingBag,
  Zap,
  Play,
  Coffee,
  Heart,
  Car,
  Trash2,
  Tag,
} from "lucide-react";

export type Transaction = {
  id: number;
  name: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
};

type Props = {
  transactions: Transaction[];
  filter: "all" | "income" | "expense";
  onFilterChange: (filter: "all" | "income" | "expense") => void;
  onDeleteTransaction?: (id: number) => void;
};

export const RecentTransactions = ({
  transactions,
  filter,
  onFilterChange,
  onDeleteTransaction,
}: Props) => {
  const formatCurrency = (amount: number, type: "income" | "expense") => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));

    return type === "income" ? `+${formatted}` : `-${formatted}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const parts = dateStr.split("T")[0].split("-");
      if (parts.length === 3) {
        const months = [
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
        const monthIndex = parseInt(parts[1], 10) - 1;
        const day = parts[2].padStart(2, "0");
        return `${months[monthIndex] || "Oct"} ${day}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const getCategoryIcon = (
    categoryName: string,
    type: "income" | "expense",
  ) => {
    const cat = categoryName.toLowerCase();

    if (type === "income" || cat === "income") {
      return {
        icon: <ArrowUp className="w-4 h-4 text-income" />,
        bg: "bg-emerald-950/40 border-emerald-800/30",
      };
    }

    if (cat.includes("hous") || cat.includes("rent")) {
      return {
        icon: <Home className="w-4 h-4 text-[#f97316]" />,
        bg: "bg-orange-950/40 border-orange-800/30",
      };
    }

    if (
      cat.includes("food") ||
      cat.includes("grocer") ||
      cat.includes("coffee")
    ) {
      if (cat.includes("coffee")) {
        return {
          icon: <Coffee className="w-4 h-4 text-[#fb923c]" />,
          bg: "bg-amber-950/40 border-amber-800/30",
        };
      }
      return {
        icon: <ShoppingBag className="w-4 h-4 text-[#fb923c]" />,
        bg: "bg-amber-950/40 border-amber-800/30",
      };
    }

    if (
      cat.includes("util") ||
      cat.includes("electric") ||
      cat.includes("bill")
    ) {
      return {
        icon: <Zap className="w-4 h-4 text-[#eab308]" />,
        bg: "bg-yellow-950/40 border-yellow-800/30",
      };
    }

    if (
      cat.includes("entertain") ||
      cat.includes("net") ||
      cat.includes("stream")
    ) {
      return {
        icon: <Play className="w-4 h-4 text-[#a855f7]" />,
        bg: "bg-purple-950/40 border-purple-800/30",
      };
    }

    if (cat.includes("health") || cat.includes("gym") || cat.includes("med")) {
      return {
        icon: <Heart className="w-4 h-4 text-[#10b981]" />,
        bg: "bg-teal-950/40 border-teal-800/30",
      };
    }

    if (
      cat.includes("trans") ||
      cat.includes("car") ||
      cat.includes("gas") ||
      cat.includes("transit")
    ) {
      return {
        icon: <Car className="w-4 h-4 text-[#06b6d4]" />,
        bg: "bg-cyan-950/40 border-cyan-800/30",
      };
    }

    return {
      icon: <Tag className="w-4 h-4 text-text-secondary" />,
      bg: "bg-surface border-border",
    };
  };

  return (
    <div className="bg-[#161a22] border border-border/80 rounded-2xl p-4 shadow-md sm:p-6">
      {/* Header with title and filter pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-text-primary text-lg font-semibold tracking-tight">
          Recent Transactions
        </h2>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-[#101319] p-1 rounded-xl border border-border/60 self-start sm:self-auto">
          {(["all", "income", "expense"] as const).map((opt) => {
            const isActive = filter === opt;
            return (
              <button
                key={opt}
                onClick={() => onFilterChange(opt)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#252d3d] text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-12 gap-2 pb-3 border-b border-border/40 text-[10px] font-mono uppercase tracking-wider text-text-dim px-2 sm:gap-4 sm:px-3 sm:text-[11px]">
        <div className="col-span-5 sm:col-span-5">TRANSACTION</div>
        <div className="hidden sm:block sm:col-span-3">CATEGORY</div>
        <div className="col-span-3 sm:col-span-2">DATE</div>
        <div className="col-span-4 text-right sm:col-span-2">AMOUNT</div>
      </div>

      {/* Transaction Rows */}
      {transactions.length === 0 ? (
        <div className="py-12 text-center text-text-secondary text-sm">
          No transactions found for this period.
        </div>
      ) : (
        <div className="divide-y divide-border/20">
          {transactions.map((tx) => {
            const isIncome = tx.type === "income";
            const iconConfig = getCategoryIcon(tx.category, tx.type);

            return (
              <div
                key={tx.id}
                className="grid grid-cols-12 items-center gap-2 rounded-xl px-2 py-3.5 transition-colors hover:bg-surface/60 group relative sm:gap-4 sm:px-3"
              >
                {/* TRANSACTION col */}
                <div className="col-span-5 flex min-w-0 items-center gap-2 sm:col-span-5 sm:gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border sm:h-9 sm:w-9 ${iconConfig.bg}`}
                  >
                    {iconConfig.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-text-primary font-medium text-sm truncate">
                      {tx.name}
                    </span>
                    <span className="text-xs text-text-secondary sm:hidden truncate">
                      {tx.category}
                    </span>
                  </div>
                </div>

                {/* CATEGORY col */}
                <div className="hidden sm:block sm:col-span-3 text-text-secondary text-sm">
                  {tx.category}
                </div>

                {/* DATE col */}
                <div className="col-span-3 whitespace-nowrap font-mono text-[10px] text-text-dim sm:col-span-2 sm:text-xs">
                  {formatDate(tx.date)}
                </div>

                {/* AMOUNT col & optional delete */}
                <div className="col-span-4 flex min-w-0 items-center justify-end gap-1 sm:col-span-2 sm:gap-2">
                  <span
                    className={`whitespace-nowrap font-mono text-[11px] font-semibold tracking-tight sm:text-sm ${
                      isIncome ? "text-income" : "text-expense"
                    }`}
                  >
                    {formatCurrency(tx.amount, tx.type)}
                  </span>

                  {onDeleteTransaction && (
                    <button
                      onClick={() => onDeleteTransaction(tx.id)}
                      title="Delete transaction"
                      className="ml-1 shrink-0 p-1 text-text-dim transition-all hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
