import api from "../../api/axios";
import { useState } from "react";
import { notify } from "../../components/ui/notifications/notify";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const res = await api.post("/api/auth/register", {
        username,
        email,
        password,
      });
      console.log(res.data);
      notify({
        title: "User registered successfully",
        text: "You can now login",
        icon: "success",
        confirm: true,
        cancel: false,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      notify({
        title: "Failed to register user",
        text: "Please try again",
        icon: "error",
        confirm: true,
        cancel: false,
      });
    }
  };
  return { setUsername, setEmail, setPassword, handleRegister };
};
