import { useState } from "react";

export type MonthlyData = {
  month: string;
  monthNum: number;
  year?: number;
  income: number;
  expense: number;
};

type Props = {
  data: MonthlyData[];
  selectedMonth: string;
  onSelectMonth: (month: string, monthNum: number, year?: number) => void;
};

export const MonthlyOverview = ({
  data,
  selectedMonth,
  onSelectMonth,
}: Props) => {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // Determine maximum value for bar chart height scaling
  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.income, d.expense)),
    6000,
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-[#161a22] border border-border/80 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-md h-full min-w-0">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-text-primary text-lg font-semibold tracking-tight">
            Monthly Overview
          </h2>
          {/* Legend */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-income inline-block" />
              <span className="text-xs text-text-secondary font-sans">
                Income
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-expense inline-block" />
              <span className="text-xs text-text-secondary font-sans">
                Expense
              </span>
            </div>
          </div>
        </div>

        {/* Month Selector Pills */}
        <div className="flex max-w-full items-center gap-1 overflow-x-auto bg-background/60 p-1 rounded-xl border border-border/50 self-start sm:self-auto">
          {data.map((item) => {
            const isSelected = selectedMonth.startsWith(item.month);
            return (
              <button
                key={`${item.month}-${item.year || ""}`}
                onClick={() =>
                  onSelectMonth(item.month, item.monthNum, item.year)
                }
                className={`shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.month}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Area */}
      <div className="overflow-x-auto pt-10 pb-2">
        <div className="flex min-w-[36rem] items-end justify-around h-52 border-b border-border/40 px-2 relative sm:min-w-0 sm:px-4">
          {data.map((item) => {
            const isSelected = selectedMonth.startsWith(item.month);
            const isHovered = hoveredMonth === item.month;

            const incomeHeight = Math.max(
              12,
              Math.round((item.income / maxVal) * 170),
            );
            const expenseHeight = Math.max(
              12,
              Math.round((item.expense / maxVal) * 170),
            );

            const incomeBarColor = isSelected
              ? "bg-income shadow-lg shadow-income/20"
              : "bg-[#184935] hover:bg-income/60";
            const expenseBarColor = isSelected
              ? "bg-expense shadow-lg shadow-expense/20"
              : "bg-[#45220c] hover:bg-expense/60";

            return (
              <div
                key={`${item.month}-${item.year || ""}`}
                className="flex shrink-0 flex-col items-center gap-2 group cursor-pointer relative"
                onMouseEnter={() => setHoveredMonth(item.month)}
                onMouseLeave={() => setHoveredMonth(null)}
                onClick={() =>
                  onSelectMonth(item.month, item.monthNum, item.year)
                }
              >
                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-12 z-20 bg-[#0e1015] border border-border px-2.5 py-1.5 rounded-lg shadow-xl text-center pointer-events-none whitespace-nowrap">
                    <p className="text-[11px] font-mono text-income">
                      +{formatCurrency(item.income)}
                    </p>
                    <p className="text-[11px] font-mono text-expense">
                      -{formatCurrency(item.expense)}
                    </p>
                  </div>
                )}

                {/* Bars side by side */}
                <div className="flex items-end gap-1.5 sm:gap-2 h-44">
                  {/* Income bar */}
                  <div
                    style={{ height: `${incomeHeight}px` }}
                    className={`w-6 sm:w-8 rounded-t-md transition-all duration-300 ${incomeBarColor}`}
                  />
                  {/* Expense bar */}
                  <div
                    style={{ height: `${expenseHeight}px` }}
                    className={`w-6 sm:w-8 rounded-t-md transition-all duration-300 ${expenseBarColor}`}
                  />
                </div>

                {/* Month label */}
                <span
                  className={`text-xs font-mono font-medium mt-2 transition-colors ${
                    isSelected ? "text-white font-bold" : "text-text-secondary"
                  }`}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
