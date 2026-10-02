import api from "../../api/axios";
import { useState } from "react";
import Swal from "sweetalert2";
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
      Swal.fire({ icon: "success", title: "User registered successfully" });
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to register user",
      });
    }
  };
  return { setUsername, setEmail, setPassword, handleRegister };
};
