import { X } from "lucide-react";
import { PrimaryButton } from "../../ui/buttons/PrimaryButton";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
  loading?: boolean;
};

export const AddTransactionLayout = ({
  children,
  onClose,
  onSubmit,
  loading = false,
}: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <form
        className="relative my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-md flex-col overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-6"
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
        <PrimaryButton type="submit" className="mt-6" disabled={loading}>
          {loading ? "Adding..." : "Add Transaction"}
        </PrimaryButton>
      </form>
    </div>
  );
};
