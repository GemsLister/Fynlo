type Props = {
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const PrimaryButton = ({
  type = "button",
  className,
  children,
  onClick,
  disabled = false,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-accent font-sans font-medium text-text-primary w-full rounded-lg p-2 hover:bg-accent-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
