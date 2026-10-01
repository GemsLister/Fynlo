type Props = {
  children: React.ReactNode;
};
export const AuthForm = ({ children }: Props) => {
  return (
    <form action="" className="flex flex-col gap-3 w-full">
      {children}
    </form>
  );
};
