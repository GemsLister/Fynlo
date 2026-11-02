import { X } from "lucide-react";
import { PrimaryButton } from "../../ui/buttons/PrimaryButton";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
};

export const AddTransactionLayout = ({
  children,
  onClose,
  onSubmit,
}: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <form
        className="flex flex-col bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
      >
        <div className="flex justify-between items-center font-sans mb-4">
          <h1 className="text-text-primary text-2xl font-bold">
            Add Transaction
          </h1>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
        <PrimaryButton type="submit" className="mt-6">
          Add Transaction
        </PrimaryButton>
      </form>
    </div>
  );
};
