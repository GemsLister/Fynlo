import { useState } from "react";
import { useNavigate } from "react-router";
import { notify } from "../../components/ui/notifications/notify";

export const useSignOut = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const handleSignOut = () => {
    setIsClicked(true);
    notify({
      title: "Sign Out of Fynlo?",
      text: "Are you sure you want to sign out?",
      icon: "question",
      confirm: true,
      cancel: true,
      confirmButtonText: "Sign Out",
      cancelButtonText: "Stay signed in",
    });

    navigate("/");
  };
  return { handleSignOut, isClicked, setIsClicked };
};
