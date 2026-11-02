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
      { value: "housing", label: "Housing" },
      { value: "food", label: "Food" },
      { value: "transportation", label: "Transportation" },
      { value: "utilities", label: "Utilities" },
      { value: "entertainment", label: "Entertainment" },
      { value: "health", label: "Health" },
    ],
    income: [
      { value: "salary", label: "Salary" },
      { value: "freelance", label: "Freelance" },
      { value: "investment", label: "Investment" },
      { value: "gift", label: "Gift" },
      { value: "other", label: "Other" },
    ],
  };
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-text-secondary">
        Category
      </label>
      <select
        name={id}
        id={id}
        className="border border-neutral-300 rounded-xl p-2 mt-2 bg-surface text-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {categoryOptions[category].map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
