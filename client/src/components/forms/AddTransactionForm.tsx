import { AddTransactionLayout } from "../layouts/main/AddTransactionLayout";
import { PrimaryButton } from "../ui/buttons/PrimaryButton";
import { SecondaryButton } from "../ui/buttons/SecondaryButton";
import { useState } from "react";
import { CategoryOptions } from "../inputs/CategoryOptions";
import { useAddTransaction } from "../../hooks/main/useAddTransaction";
type Props = {
  onClose?: () => void;
};

// const inputs = [
//   {
//     label: "Name",
//     placeholder: ({ type }: { type: "expense" | "income" }) =>
//       type === "expense" ? "e.g. Grocery Store" : "e.g. Salary",
//     type: "text",
//   },
//   {
//     label: "Amount",
//     placeholder: "e.g. $100",
//     type: "number",
//   },
//   {
//     label: "Date",
//     placeholder: "Select a date",
//     type: "date",
//   },
// ];

export const AddTransactionForm = ({ onClose }: Props) => {
  const [type, setType] = useState<"expense" | "income">("expense");
  const {
    name,
    setName,
    amount,
    setAmount,
    category,
    setCategory,
    date,
    setDate,
    isClicked,
    handleAddTransaction,
  } = useAddTransaction();
  const inputs = [
    {
      label: "Name",
      value: name,
      onChange: (val: string) => setName(val),
      placeholder: type === "expense" ? "e.g. Grocery Store" : "e.g. Salary",
      type: "text",
    },
    {
      label: "Amount",
      value: amount,
      onChange: (val: string) => setAmount(val),
      placeholder: "e.g. $100",
      type: "number",
    },
    {
      label: "Date",
      value: date,
      onChange: (val: string) => setDate(val),
      placeholder: "Select a date",
      type: "date",
    },
  ];
  return (
    <AddTransactionLayout onClose={onClose} onSubmit={handleAddTransaction}>
      <div className="flex gap-1 mb-1">
        {type === "expense" ? (
          // If it is active
          <PrimaryButton onClick={() => setType("expense")}>
            Expense
          </PrimaryButton>
        ) : (
          // If it is inactive
          <SecondaryButton
            onClick={() => setType("expense")}
            className="hover:!border-accent-hover hover:text-white"
          >
            Expense
          </SecondaryButton>
        )}
        {/* If the button is income */}
        {type === "income" ? (
          <PrimaryButton onClick={() => setType("income")}>
            Income
          </PrimaryButton>
        ) : (
          <SecondaryButton
            onClick={() => setType("income")}
            className="hover:!border-accent-hover hover:text-white"
          >
            Income
          </SecondaryButton>
        )}
      </div>

      {inputs.map((input, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor={`${input.label}-${index}`}
              className="text-text-secondary"
            >
              {input.label}
            </label>
            <input
              value={input.value}
              onChange={(e) => input.onChange(e.target.value)}
              placeholder={input.placeholder}
              type={input.type}
              className="border border-neutral-300 rounded-xl p-2 mt-2 bg-surface text-white"
            />
          </div>
          {/* Category between Amount and Date */}
          {index === 1 && (
            <CategoryOptions
              category={type}
              id="category"
              value={category}
              onChange={(val) => setCategory(val)}
            />
          )}
        </div>
      ))}
    </AddTransactionLayout>
  );
};
