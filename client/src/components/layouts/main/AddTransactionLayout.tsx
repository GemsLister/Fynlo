import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

export const AddTransactionLayout = ({ children, onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex flex-col bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
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
      </div>
    </div>
  );
};
