"use client";

import { useState } from "react";

import { Home } from "lucide-react";

import ExpenseForm from "./components/ExpenseForm";
import BalanceCard from "@/app/components/BalanceCard";
import ExpensesLineChart from "./components/ExpensesLineChart";
import DateFilter from "./components/DateFilter";
import ExpenseTable from "./components/ExpenseTable";
import ExpensesBarChart from "./components/ExpensesBarChart";

function Expenses() {

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <div className="">
      <div className="flex items-center gap-1 text-md mb-4">
        <Home className="w-4 h-4" />
        <span>/Add Expenses</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Add Expenses</h1>
      <div className="grid grid-cols-1 items-center lg:grid-cols-4 gap-4">
        <BalanceCard refreshTrigger={refreshTrigger}/>
        <ExpenseForm onSuccess={handleRefresh}/>
      </div>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-4 my-4 h-70">

      <ExpensesLineChart />
      <ExpensesBarChart />
      </div>
      <DateFilter />
      <ExpenseTable refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default Expenses;
