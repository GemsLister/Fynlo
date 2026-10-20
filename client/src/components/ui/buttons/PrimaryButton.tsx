type Props = {
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const PrimaryButton = ({
  type = "button",
  className,
  children,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      className={`bg-accent font-sans font-medium text-text-primary w-full rounded-lg p-2 hover:bg-accent-hover transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
