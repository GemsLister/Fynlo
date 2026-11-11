type Props = {
  heading: string;
  subheading: string;
  children: React.ReactNode;
};

export const AuthLayout = ({ heading, subheading, children }: Props) => {
  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 font-sans sm:p-12">
      <div className="flex flex-col items-center mb-5">
        <h1 className="text-center text-text-primary text-2xl font-bold">
          {heading}
        </h1>
        <p className="text-center text-sm text-text-secondary font-light">
          {subheading}
        </p>
      </div>
      {children}
    </div>
  );
};
