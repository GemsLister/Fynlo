import axios from "axios";
import api from "../../api/axios";
import { notify } from "../../components/ui/notifications/notify";
import { useState } from "react";

export const useAddTransaction = (onSuccess?: () => void) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [category, setCategory] = useState("housing");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [isClicked, setIsClicked] = useState(false);

  const handleAddTransaction = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) {
      notify({
        title: "Missing Name",
        text: "Please enter a transaction name",
        icon: "warning",
        confirm: true,
        cancel: false,
      });
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      notify({
        title: "Invalid Amount",
        text: "Please enter a valid amount",
        icon: "warning",
        confirm: true,
        cancel: false,
      });
      return;
    }

    try {
      setIsClicked(true);
      const res = await api.post("/api/transaction/add-transaction", {
        name: name.trim(),
        amount: Number(amount),
        category: category || (type === "income" ? "Income" : "Housing"),
        type,
        date,
      });

      if (res.status === 201) {
        notify({
          title: "Transaction added",
          text: "Transaction added successfully",
          icon: "success",
          confirm: true,
          cancel: false,
          confirmButtonText: "OK",
        });

        // Reset fields
        setName("");
        setAmount("");
        setDate(new Date().toISOString().split("T")[0]);

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error: unknown) {
      console.error("Transaction failed: ", error);
      let message = "Please try again";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }
      notify({
        title: "Transaction Failed",
        text: message,
        icon: "error",
        confirm: true,
        cancel: false,
        confirmButtonText: "OK",
      });
    } finally {
      setIsClicked(false);
    }
  };

  return {
    name,
    setName,
    amount,
    setAmount,
    type,
    setType,
    category,
    setCategory,
    date,
    setDate,
    isClicked,
    handleAddTransaction,
  };
};
