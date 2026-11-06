import { HeaderLayout } from "./HeaderLayout";

type Props = {
  children: React.ReactNode;
  username?: string;
  onOpenAddTransaction: () => void;
  selectedMonth?: string;
};

export const MainLayout = ({
  children,
  username,
  onOpenAddTransaction,
  selectedMonth,
}: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary selection:bg-accent/30 selection:text-white">
      <HeaderLayout
        username={username}
        onOpenAddTransaction={onOpenAddTransaction}
        selectedMonth={selectedMonth}
      />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {children}
      </main>
    </div>
  );
};
