"use client";

import { Home } from "lucide-react";
import{ useState} from "react";

import InvestmentForm from "./components/InvestmentForm";
import BalanceCard from "@/app/components/BalanceCard";
import InvestmentLineChart from "./components/InvestmentLineChart";
import DateFilter from "./components/DateFilter";
import InvestmentTable from "./components/InvestmentTable";
import InvestmentBarChart from "./components/InvestmentBarChart";

function Investment() {

    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const handleRefresh = () => setRefreshTrigger(prev => prev + 1);
  return (
    <div className="">
      <div className="flex items-center gap-1 text-md mb-4">
        <Home className="w-4 h-4" />
        <span>/Add Investment</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Add Investment</h1>
      <div className="grid grid-cols-1 items-center lg:grid-cols-4 gap-4">
        <BalanceCard refreshTrigger={refreshTrigger}/>
        <InvestmentForm onSuccess={handleRefresh} />
      </div>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-4 my-4 h-70">

      <InvestmentLineChart />
      <InvestmentBarChart />
      </div>
      <DateFilter />
      <InvestmentTable refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default Investment;
