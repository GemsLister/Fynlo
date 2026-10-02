type Props = {
  type: "text" | "email" | "password";
  placeholder: string;
  label: string;
  setValue: (value: string) => void;
};

export const AuthInputs = ({ type, placeholder, label, setValue }: Props) => {
  return (
    <div className="flex flex-col text-text-secondary font-mono text-sm gap-2">
      <label htmlFor={label} className="text-xs">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="p-2.5 bg-surface rounded-xl border border-border"
      />
    </div>
  );
};
