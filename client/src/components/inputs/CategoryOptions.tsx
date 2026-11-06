type CategoryType = {
  category: "expense" | "income";
  id: string;
  value: string;
  onChange: (value: string) => void;
};

export const CategoryOptions = ({
  category,
  id,
  value,
  onChange,
}: CategoryType) => {
  const categoryOptions = {
    expense: [
      { value: "Housing", label: "Housing" },
      { value: "Food", label: "Food" },
      { value: "Utilities", label: "Utilities" },
      { value: "Transport", label: "Transport" },
      { value: "Entertainment", label: "Entertainment" },
      { value: "Health", label: "Health" },
    ],
    income: [
      { value: "Income", label: "Income" },
      { value: "Salary", label: "Salary" },
      { value: "Freelance", label: "Freelance" },
      { value: "Dividend", label: "Dividend" },
      { value: "Investment", label: "Investment" },
      { value: "Other", label: "Other" },
    ],
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-text-secondary text-sm font-medium">
        Category
      </label>
      <select
        name={id}
        id={id}
        className="border border-border rounded-xl p-2.5 bg-surface text-text-primary focus:outline-none focus:border-accent text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {categoryOptions[category].map((option, index) => (
          <option key={index} value={option.value} className="bg-surface text-text-primary">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
