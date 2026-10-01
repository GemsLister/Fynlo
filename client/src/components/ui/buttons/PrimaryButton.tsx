type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const PrimaryButton = ({ className, children, onClick }: Props) => {
  return (
    <button
      className={`bg-accent font-sans font-medium text-text-primary w-full rounded-lg p-2 hover:bg-accent-hover transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
