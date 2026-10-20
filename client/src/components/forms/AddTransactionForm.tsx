import { AddTransactionLayout } from "../layouts/main/AddTransactionLayout";

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
  return (
    <AddTransactionLayout onClose={onClose}>
      <form>
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
      </form>
    </AddTransactionLayout>
  );
};
