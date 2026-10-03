import { HeaderLayout } from "./HeaderLayout";
type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen bg-background">
      <HeaderLayout />
      {children}
    </div>
  );
};
