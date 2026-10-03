import api from "../../api/axios";
import { notify } from "../../components/ui/notifications/notify";
import { useState } from "react";

export const useAddTransaction = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const handleAddTransaction = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      setIsClicked(true);
      const res = await api.post("/api/add-transaction", {
        name,
        amount,
        category,
        date,
      });
      if (res.status === 201) {
        console.log("Transaction successfully added!");
        notify({
          title: "Transaction added",
          text: "Transaction added successfully",
          icon: "success",
          confirm: true,
          cancel: false,
        });
      }
    } catch (error) {
      console.error("Transaction failed: ", error);
      notify({
        title: "Transaction Failed",
        text: error.response.data.message || "Please try again",
        icon: "error",
        confirm: true,
        cancel: false,
      });
    } finally {
      setIsClicked(false);
    }
  };
  return {
    setName,
    setAmount,
    setCategory,
    setDate,
    isClicked,
    handleAddTransaction,
  };
};
