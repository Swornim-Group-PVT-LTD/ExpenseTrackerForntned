"use client";

import { Home } from "lucide-react";
import { useState } from "react";
import SavingForm from "./components/SavingForm";
import BalanceCard from "@/app/components/BalanceCard";
import SavingLineChart from "./components/SavingLineChart";
import DateFilter from "./components/DateFilter";
import SavingTable from "./components/SavingTable";
import SavingBarChart from "./components/SavingBarChart";

function Saving() {

    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const handleRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <div className="">
      <div className="flex items-center gap-1 text-md mb-4">
        <Home className="w-4 h-4" />
        <span>/Add Saving</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Add Saving</h1>
      <div className="grid grid-cols-1 items-center lg:grid-cols-4 gap-4">
        <BalanceCard refreshTrigger={refreshTrigger} />
        <SavingForm onSuccess={handleRefresh} />
      </div>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-4 my-4 h-70">

      <SavingLineChart />
      <SavingBarChart />
      </div>
      <DateFilter />
      <SavingTable refreshTrigger={refreshTrigger}/>
    </div>
  );
}

export default Saving;
