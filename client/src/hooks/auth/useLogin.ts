import { useState } from "react";
import axios from "axios";
import api from "../../api/axios";
import { notify } from "../../components/ui/notifications/notify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      if (res.status === 200) {
        setLoading(true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.username);
        notify({
          title: "Login success",
          text: "You have been logged in successfully",
          icon: "success",
          confirm: true,
          cancel: false,
          confirmButtonText: "OK",
        });
        navigate("/home");
      }
    } catch (error: unknown) {
      let message = "Please try again";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }
      notify({
        title: "Login Failed",
        text: message,
        icon: "error",
        confirm: true,
        cancel: false,
        confirmButtonText: "OK",
      });
    }
  };

  return { loading, setEmail, setPassword, handleLogin };
};
