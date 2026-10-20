import fynloLogo from "../../../assets/fynlo-logo.png";
import { PrimaryButton } from "../../ui/buttons/PrimaryButton";
import { SecondaryButton } from "../../ui/buttons/SecondaryButton";
import { useNavigate } from "react-router";
import { useAddTransaction } from "../../../hooks/main/useAddTransaction";
import { useSignOut } from "../../../hooks/main/useSignOut";
import { AddTransactionForm } from "../../forms/AddTransactionForm";
import { useState } from "react";

export const HeaderLayout = () => {
  const date = new Date();
  const { handleSignOut, isClicked: signOutIsClicked } = useSignOut();
  const [addTransactionOpen, setAddTransactionOpen] = useState(false);
  return (
    <header className="flex justify-between items-center bg-surface px-5 py-5">
      <div className="flex justify-center items-center h-full">
        <img src={fynloLogo} alt="fynlo-logo" className="rounded-full w-16" />
      </div>

      <div className="flex items-center gap-3">
        <p className="text-text-primary font-sans text-sm whitespace-nowrap">
          {date.toDateString()}
        </p>

        <PrimaryButton
          className="w-auto whitespace-nowrap"
          onClick={() => {
            setAddTransactionOpen(true);
          }}
        >
          + Add Transaction
        </PrimaryButton>
        <SecondaryButton
          className="w-auto whitespace-nowrap text-sm"
          onClick={() => {
            if (signOutIsClicked) {
              return;
            }
            handleSignOut();
          }}
        >
          Sign out
        </SecondaryButton>
      </div>
      {addTransactionOpen && (
        <AddTransactionForm onClose={() => setAddTransactionOpen(false)} />
      )}
    </header>
  );
};
