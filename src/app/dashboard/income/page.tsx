"use client";

import { Home } from "lucide-react";

import IncomeForm from "./components/IncomeForm";
import BalanceCard from "./components/BalanceCard";
import IncomeLineChart from "./components/IncomeLineChart";
import DateFilter from "./components/DateFilter";
import IncomeTable from "./components/IncomeTable";
import IncomeBarChart from "./components/IncomeBarChart";

function Income() {
  return (
    <div className="">
      <div className="flex items-center gap-1 text-md mb-4">
        <Home className="w-4 h-4" />
        <span>/Add Income</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Add Income</h1>
      <div className="grid grid-cols-1 items-center lg:grid-cols-4 gap-4">
        <BalanceCard />
        <IncomeForm />
      </div>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-4 my-4 h-70">

      <IncomeLineChart />
      <IncomeBarChart />
      </div>
      <DateFilter />
      <IncomeTable />
    </div>
  );
}

export default Income;
