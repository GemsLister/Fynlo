import { useState } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have been logged in successfully",
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response.data.message || "Please try again",
      });
    }
  };

  return { setEmail, setPassword, handleLogin };
};
