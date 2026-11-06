export type CategoryBudget = {
  name: string;
  spent: number;
  budget: number;
  percentage: number;
  color: string;
};

export const BudgetByCategory = ({
  categories,
}: {
  categories: CategoryBudget[];
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(val || 0);
  };

  return (
    <div className="bg-[#161a22] border border-border/80 rounded-2xl p-6 flex flex-col justify-between shadow-md h-full">
      <h2 className="text-text-primary text-lg font-semibold tracking-tight mb-5">
        Budget by Category
      </h2>

      <div className="flex flex-col gap-5">
        {categories.map((cat) => {
          return (
            <div key={cat.name} className="flex flex-col gap-1.5">
              {/* Row header: category name and amounts */}
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-text-primary font-medium">
                    {cat.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="text-text-secondary">
                    {formatCurrency(cat.spent)}{" "}
                    <span className="text-text-dim">/</span>{" "}
                    {formatCurrency(cat.budget)}
                  </span>
                </div>
              </div>

              {/* Progress bar and percentage */}
              <div className="flex flex-col gap-1">
                <div className="w-full bg-[#1c2130] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, cat.percentage)}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <span
                    className="text-[10px] font-mono font-medium text-text-dim"
                    style={{
                      color:
                        cat.percentage >= 90
                          ? cat.color
                          : "var(--color-text-dim)",
                    }}
                  >
                    {cat.percentage}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
