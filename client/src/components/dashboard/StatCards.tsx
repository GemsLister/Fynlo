type SummaryProps = {
  netBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
  incomeSources: number;
  expenseTransactions: number;
};

export const StatCards = ({ summary }: { summary: SummaryProps }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(val || 0);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Net Balance */}
      <div className="bg-[#121a1b] border border-emerald-900/40 hover:border-emerald-700/60 transition-all rounded-2xl p-5 flex flex-col justify-between shadow-lg shadow-emerald-950/20 relative overflow-hidden group">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase">
            NET BALANCE
          </span>
          <span className="text-3xl font-bold font-mono text-income tracking-tight mt-1">
            {formatCurrency(summary.netBalance)}
          </span>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-xs font-mono text-income font-medium">
            +{summary.savingsRate}% saved
          </span>
        </div>
      </div>

      {/* 2. Total Income */}
      <div className="bg-[#161a22] border border-border/80 hover:border-border transition-all rounded-2xl p-5 flex flex-col justify-between shadow-md">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase">
            TOTAL INCOME
          </span>
          <span className="text-3xl font-bold font-mono text-income tracking-tight mt-1">
            {formatCurrency(summary.totalIncome)}
          </span>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-xs font-sans text-text-dim">
            {summary.incomeSources}{" "}
            {summary.incomeSources === 1 ? "source" : "sources"}
          </span>
        </div>
      </div>

      {/* 3. Total Expenses */}
      <div className="bg-[#161a22] border border-border/80 hover:border-border transition-all rounded-2xl p-5 flex flex-col justify-between shadow-md">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase">
            TOTAL EXPENSES
          </span>
          <span className="text-3xl font-bold font-mono text-expense tracking-tight mt-1">
            {formatCurrency(summary.totalExpenses)}
          </span>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-xs font-sans text-text-dim">
            {summary.expenseTransactions}{" "}
            {summary.expenseTransactions === 1
              ? "transaction"
              : "transactions"}
          </span>
        </div>
      </div>

      {/* 4. Savings Rate */}
      <div className="bg-[#161a22] border border-border/80 hover:border-border transition-all rounded-2xl p-5 flex flex-col justify-between shadow-md">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase">
            SAVINGS RATE
          </span>
          <span className="text-3xl font-bold font-mono text-[#818cf8] tracking-tight mt-1">
            {summary.savingsRate}%
          </span>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-xs font-sans text-text-dim">
            of income saved
          </span>
        </div>
      </div>
    </div>
  );
};

