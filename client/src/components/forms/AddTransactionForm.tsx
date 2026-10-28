import { AddTransactionLayout } from "../layouts/main/AddTransactionLayout";
import { PrimaryButton } from "../ui/buttons/PrimaryButton";
import { SecondaryButton } from "../ui/buttons/SecondaryButton";
import { useState } from "react";
type Props = {
  onClose?: () => void;
};

const inputs = [
  {
    label: "Name",
    placeholder: "e.g. Grocery Store",
    type: "text",
  },
  {
    label: "Amount",
    placeholder: "e.g. $100",
    type: "number",
  },
  {
    label: "Category",
    placeholder: "Select a category",
    type: "select",
    options: [
      { value: "", label: "Housing" },
      { value: "", label: "Food" },
      { value: "", label: "Transportation" },
      { value: "", label: "Utilities" },
      { value: "", label: "Entertainment" },
      { value: "", label: "Health" },
    ],
  },
  {
    label: "Date",
    placeholder: "Select a date",
    type: "date",
  },
];

export const AddTransactionForm = ({ onClose }: Props) => {
  const [type, setType] = useState<"expense" | "income">("expense");
  return (
    <AddTransactionLayout onClose={onClose}>
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
            className="hover:!border-accent-hover hover:text-text-secondary"
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
            className="hover:!border-accent-hover hover:text-text-secondary"
          >
            Income
          </SecondaryButton>
        )}
      </div>

      <div>
        {inputs.map((input, index) => (
          <div key={index} className="flex flex-col">
            <label htmlFor={`${input.label}-${index}`}>{input.label}</label>
            <input
              placeholder={input.placeholder}
              type={input.type}
              className="border border-neutral-300 rounded-xl p-2 mt-2"
            />
          </div>
        ))}
      </div>
    </AddTransactionLayout>
  );
};
