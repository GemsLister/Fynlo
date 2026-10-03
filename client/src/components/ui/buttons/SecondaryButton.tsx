type Props = {
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const SecondaryButton = ({
  type = "button",
  className,
  children,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      className={`bg-background font-sans font-medium text-text-secondary w-full rounded-lg p-2  border hover:border-expense hover:text-expense transition-all duration-200F ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
