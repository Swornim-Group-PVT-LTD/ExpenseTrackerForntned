"use client";

import { Home } from "lucide-react";

import ExpenseForm from "./components/ExpenseForm";
import BalanceCard from "./components/BalanceCard";
import ExpensesLineChart from "./components/ExpensesLineChart";
import DateFilter from "./components/DateFilter";
import ExpenseTable from "./components/ExpenseTable";
import ExpensesBarChart from "./components/ExpensesBarChart";

function Expenses() {
  return (
    <div className="">
      <div className="flex items-center gap-1 text-md mb-4">
        <Home className="w-4 h-4" />
        <span>/Add Expenses</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Add Expenses</h1>
      <div className="grid grid-cols-1 items-center lg:grid-cols-4 gap-4">
        <BalanceCard />
        <ExpenseForm />
      </div>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-4 my-4 h-70">

      <ExpensesLineChart />
      <ExpensesBarChart />
      </div>
      <DateFilter />
      <ExpenseTable />
    </div>
  );
}

export default Expenses;
