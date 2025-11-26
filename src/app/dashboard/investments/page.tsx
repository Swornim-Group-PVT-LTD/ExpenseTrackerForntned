"use client";

import { Home } from "lucide-react";
import{ useState} from "react";

import InvestmentForm from "./components/InvestmentForm";
import BalanceCard from "@/app/components/BalanceCard";
import InvestmentLineChart from "./components/InvestmentLineChart";
import DateFilter from "@/app/components/DateFilter";
import InvestmentTable from "./components/InvestmentTable";
import InvestmentBarChart from "./components/InvestmentBarChart";

import {getInvestmentByDateRangeService} from "@/app/services/investmentService";
import { InvestmentResponse } from "@/app/types/investmentType";

function Investment() {
  const [filteredData, setFilteredData] = useState<InvestmentResponse[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const handleRefresh = () => setRefreshTrigger(prev => prev + 1);

    const handleFilter = (data: InvestmentResponse[]) => {
      setFilteredData(data);
      setIsFilterActive(true);
    }
    const clearFilter = () => {
      setFilteredData([]);
      setIsFilterActive(false);
    }

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
      <DateFilter fetchService={getInvestmentByDateRangeService} onFilter={handleFilter} />
            
            {isFilterActive && (
              <div className="mb-4 flex items-center gap-2">
                
                <span className="text-sm text-gray-600">Showing {filteredData.length} filtered results</span>
                <button 
                  onClick={clearFilter}
                  className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  Show All
                </button>
              </div>
            )}
      <InvestmentTable refreshTrigger={refreshTrigger} filteredData={isFilterActive ? filteredData : null} onSuccess={handleRefresh}  />
    </div>
  );
}

export default Investment;
