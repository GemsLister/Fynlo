import fynloLogo from "../../../assets/fynlo-logo.png";
import { PrimaryButton } from "../../ui/buttons/PrimaryButton";
import { SecondaryButton } from "../../ui/buttons/SecondaryButton";
import { useNavigate } from "react-router";

export const HeaderLayout = () => {
  const date = new Date();
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center bg-surface px-5 py-5">
      <div className="flex justify-center items-center h-full">
        <img src={fynloLogo} alt="fynlo-logo" className="rounded-full w-16" />
      </div>

      <div className="flex items-center gap-3">
        <p className="text-text-primary font-sans text-sm whitespace-nowrap">
          {date.toDateString()}
        </p>

        <PrimaryButton className="w-auto whitespace-nowrap">
          + Add Transaction
        </PrimaryButton>
        <SecondaryButton
          className="w-auto whitespace-nowrap text-sm"
          onClick={() => navigate("/")}
        >
          Sign out
        </SecondaryButton>
      </div>
    </header>
  );
};
