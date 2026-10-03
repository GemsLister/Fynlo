import { useState } from "react";
import api from "../../api/axios";
import { notify } from "../../components/ui/notifications/notify";
export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      if (res.status === 200) {
        notify({
          title: "Login success",
          text: "You have been logged in successfully",
          icon: "success",
          confirm: true,
          cancel: false,
        });
      }
    } catch (error) {
      notify({
        title: "Login Failed",
        text: error.response.data.message || "Please try again",
        icon: "error",
        confirm: true,
        cancel: false,
      });
    }
  };

  return { setEmail, setPassword, handleLogin };
};
