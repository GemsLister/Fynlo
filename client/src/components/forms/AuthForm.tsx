import { PrimaryButton } from "../ui/buttons/PrimaryButton";
type Props = {
  text: string;
  children: React.ReactNode;
  onSubmit: () => void;
};
export const AuthForm = ({ text, children, onSubmit }: Props) => {
  return (
    <form action="" className="flex flex-col gap-3 w-full" onSubmit={onSubmit}>
      {children}
      <PrimaryButton className="mt-6">{text}</PrimaryButton>
    </form>
  );
};
