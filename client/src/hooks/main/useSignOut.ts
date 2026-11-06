import { useNavigate } from "react-router";
import { notify } from "../../components/ui/notifications/notify";

export const useSignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    notify({
      title: "Sign Out of Fynlo?",
      text: "Are you sure you want to sign out?",
      icon: "question",
      confirm: true,
      cancel: true,
      confirmButtonText: "Sign Out",
      cancelButtonText: "Stay signed in",
      onConfirm: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/");
      },
    });
  };

  return { handleSignOut };
};
