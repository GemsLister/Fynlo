import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { setEmail, setPassword, handleLogin };
};
