import { AddTransactionLayout } from "../layouts/main/AddTransactionLayout";
import { PrimaryButton } from "../ui/buttons/PrimaryButton";
import { SecondaryButton } from "../ui/buttons/SecondaryButton";
import { CategoryOptions } from "../inputs/CategoryOptions";
import { useAddTransaction } from "../../hooks/main/useAddTransaction";

type Props = {
  onClose?: () => void;
  onSuccess?: () => void;
};

export const AddTransactionForm = ({ onClose, onSuccess }: Props) => {
  const {
    name,
    setName,
    amount,
    setAmount,
    type,
    setType,
    category,
    setCategory,
    date,
    setDate,
    isClicked,
    handleAddTransaction,
  } = useAddTransaction(() => {
    if (onSuccess) onSuccess();
    if (onClose) onClose();
  });

  const handleTypeChange = (newType: "expense" | "income") => {
    setType(newType);
    if (newType === "expense") {
      setCategory("housing");
    } else {
      setCategory("salary");
    }
  };

  const inputs = [
    {
      label: "Name",
      value: name,
      onChange: (val: string) => setName(val),
      placeholder:
        type === "expense" ? "e.g. Grocery Store" : "e.g. Salary Deposit",
      type: "text",
    },
    {
      label: "Amount",
      value: amount,
      onChange: (val: string) => setAmount(val),
      placeholder: "e.g. 150.00",
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
    <AddTransactionLayout
      onClose={onClose}
      onSubmit={handleAddTransaction}
      loading={isClicked}
    >
      <div className="flex gap-2 mb-4">
        {type === "expense" ? (
          <PrimaryButton
            type="button"
            onClick={() => handleTypeChange("expense")}
            className="!bg-accent !hover:bg-accent-hover flex-1"
          >
            Expense
          </PrimaryButton>
        ) : (
          <SecondaryButton
            type="button"
            onClick={() => handleTypeChange("expense")}
            className="hover:!border-accent hover:!text-white flex-1"
          >
            Expense
          </SecondaryButton>
        )}

        {type === "income" ? (
          <PrimaryButton
            type="button"
            onClick={() => handleTypeChange("income")}
            className="!bg-accent !hover:bg-accent-hover !text-white font-semibold flex-1"
          >
            Income
          </PrimaryButton>
        ) : (
          <SecondaryButton
            type="button"
            onClick={() => handleTypeChange("income")}
            className="hover:!border-accent hover:text-white flex-1"
          >
            Income
          </SecondaryButton>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {inputs.map((input, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className="text-text-secondary text-sm font-medium">
              {input.label}
            </label>
            <input
              value={input.value}
              onChange={(e) => input.onChange(e.target.value)}
              placeholder={input.placeholder}
              type={input.type}
              step={input.type === "number" ? "any" : undefined}
              required
              className="border border-border rounded-xl p-2.5 bg-surface text-text-primary focus:outline-none focus:border-accent text-sm"
            />
            {/* Category selection right after Amount */}
            {index === 1 && (
              <div className="mt-3">
                <CategoryOptions
                  category={type}
                  id="category"
                  value={category}
                  onChange={(val) => setCategory(val)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </AddTransactionLayout>
  );
};
