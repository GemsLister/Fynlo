import { Plus } from "lucide-react";
import { useSignOut } from "../../../hooks/main/useSignOut";
import FynloLogo from "../../../assets/fynlo-logo.png";

type Props = {
  username?: string;
  onOpenAddTransaction: () => void;
  selectedMonth?: string;
};

export const HeaderLayout = ({
  username,
  onOpenAddTransaction,
  selectedMonth,
}: Props) => {
  const { handleSignOut } = useSignOut();

  const userInitial = (username || "J").charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border/50 bg-[#0e1015]/90 px-3 py-3 backdrop-blur-md sm:px-6 sm:py-4">
      {/* Brand logo & title */}
      <div className="flex items-center gap-3">
        <img src={FynloLogo} alt="Fynlo Logo" className="w-12 rounded-full sm:w-16" />
      </div>

      {/* Right controls */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        {/* Date display */}
        <span className="text-text-secondary font-mono text-xs hidden sm:inline-block">
          {selectedMonth}
        </span>

        {/* Add Transaction Button */}
        <button
          onClick={onOpenAddTransaction}
          title="Add transaction"
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-2.5 py-2 text-xs font-medium text-white shadow-md shadow-accent/20 transition-all hover:bg-accent-hover active:scale-95 sm:px-4 sm:text-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </button>

        {/* User avatar circle */}
        <div
          title={username}
          className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border border-accent/40 bg-[#1c2130] font-mono text-xs font-bold text-[#818cf8]"
        >
          {userInitial}
        </div>

        {/* Sign out button */}
        <button
          onClick={handleSignOut}
          className="shrink-0 rounded-lg border border-border bg-surface/40 px-2 py-1.5 text-xs font-medium text-text-secondary transition-all hover:bg-surface hover:text-text-primary sm:px-3 sm:text-sm"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};
