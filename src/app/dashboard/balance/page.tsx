import React from "react";

import BalanceForm from "./components/BalanceForm";
import BalanceTable from "./components/BalanceTable";
import DateFilter from "./components/DateFilter";
import BalanceLineChart from "./components/BalanceLineChart";

import { Home } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="flex items-center gap-1 text-md mb-4">
        <Home className="w-4 h-4" />
        <span>/Add Balance</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Add Balance</h1>

      <BalanceForm />
      <BalanceLineChart />
      <DateFilter />
      <BalanceTable />
    </div>
  );
};

export default page;
