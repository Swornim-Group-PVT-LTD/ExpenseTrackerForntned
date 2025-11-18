"use client";

import { Home } from "lucide-react";

import SavingForm from "./components/SavingForm";
import BalanceCard from "./components/BalanceCard";
import SavingLineChart from "./components/SavingLineChart";
import DateFilter from "./components/DateFilter";
import SavingTable from "./components/SavingTable";
import SavingBarChart from "./components/SavingBarChart";

function Saving() {
  return (
    <div className="">
      <div className="flex items-center gap-1 text-md mb-4">
        <Home className="w-4 h-4" />
        <span>/Add Saving</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Add Saving</h1>
      <div className="grid grid-cols-1 items-center lg:grid-cols-4 gap-4">
        <BalanceCard />
        <SavingForm />
      </div>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-4 my-4 h-70">

      <SavingLineChart />
      <SavingBarChart />
      </div>
      <DateFilter />
      <SavingTable />
    </div>
  );
}

export default Saving;
