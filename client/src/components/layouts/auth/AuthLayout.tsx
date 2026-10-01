import { PrimaryButton } from "../../ui/buttons/PrimaryButton";
type Props = {
  heading: string;
  subheading: string;
  children: React.ReactNode;
};

export const AuthLayout = ({ heading, subheading, children }: Props) => {
  return (
    <div className=" bg-card p-12 font-sans rounded-3xl w-100 border border-border">
      <div className="flex flex-col items-center mb-5">
        <h1 className="text-text-primary text-2xl font-bold mr-4">{heading}</h1>
        <p className="text-sm text-text-secondary font-light mr-3">
          {subheading}
        </p>
      </div>
      {children}
      <PrimaryButton className="mt-6">Sign In</PrimaryButton>
    </div>
  );
};
