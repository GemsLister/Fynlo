import { MainLayout } from "../../components/layouts/main/MainLayout";
import { useState, useEffect } from "react";
// import { AddTransactionForm } from "../../components/forms/AddTransactionForm";

export const MainPage = () => {
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col px-5 py-6">
        <h1 className="text-text-primary text-3xl font-bold">
          Welcome back, {username || "User"}
        </h1>
        <h2 className="text-text-secondary text-lg">
          Your finances, at a glance.
        </h2>
      </div>

      {/* <AddTransactionForm /> */}
    </MainLayout>
  );
};
