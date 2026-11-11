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
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-3 py-5 sm:gap-8 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
};
