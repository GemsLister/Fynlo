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
    <header className="flex justify-between items-center bg-[#0e1015]/90 border-b border-border/50 px-6 py-4 backdrop-blur-md sticky top-0 z-40">
      {/* Brand logo & title */}
      <div className="flex items-center gap-3">
        <img src={FynloLogo} alt="Fynlo Logo" className="rounded-full w-16" />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Date display */}
        <span className="text-text-secondary font-mono text-xs hidden sm:inline-block">
          {selectedMonth}
        </span>

        {/* Add Transaction Button */}
        <button
          onClick={onOpenAddTransaction}
          className="bg-accent hover:bg-accent-hover text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-md shadow-accent/20 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Transaction</span>
        </button>

        {/* User avatar circle */}
        <div
          title={username}
          className="w-8 h-8 rounded-full bg-[#1c2130] border border-accent/40 text-[#818cf8] font-bold text-xs flex items-center justify-center font-mono select-none"
        >
          {userInitial}
        </div>

        {/* Sign out button */}
        <button
          onClick={handleSignOut}
          className="text-text-secondary hover:text-text-primary text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg border border-border bg-surface/40 hover:bg-surface transition-all cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};
