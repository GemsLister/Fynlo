import { PrimaryButton } from "../ui/buttons/PrimaryButton";
type Props = {
  type?: "button" | "submit";
  text: string;
  children: React.ReactNode;
  onSubmit: () => void;
};
export const AuthForm = ({
  type = "button",
  text,
  children,
  onSubmit,
}: Props) => {
  return (
    <form action="" className="flex flex-col gap-3 w-full" onSubmit={onSubmit}>
      {children}
      <PrimaryButton type={type} className="mt-6">
        {text}
      </PrimaryButton>
    </form>
  );
};
