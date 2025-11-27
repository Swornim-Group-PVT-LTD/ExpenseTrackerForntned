"use client";

import { Home } from "lucide-react";

import{ useState }from "react";

import IncomeForm from "./components/IncomeForm";
import BalanceCard from "@/app/components/BalanceCard";
import IncomeLineChart from "./components/IncomeLineChart";
import DateFilter from "@/app/components/DateFilter";
import IncomeTable from "./components/IncomeTable";
import IncomeBarChart from "./components/IncomeBarChart";

import {getIncomeByDateRangeService} from "@/app/services/incomeService";
import { IncomeResponse } from "@/app/types/incomeType";


function Income() {

  const [filteredData, setFilteredData] = useState<IncomeResponse[]>([]);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [currentDateRange, setCurrentDateRange] = useState<{start: string, end: string} | null>(null);

    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const handleRefresh = async () => {
      setRefreshTrigger(prev => prev + 1);
      // Re-apply filter if one is active
      if (isFilterActive && currentDateRange) {
        try {
          const response = await getIncomeByDateRangeService(currentDateRange.start, currentDateRange.end);
          setFilteredData(response);
        } catch (error) {
          console.error('Failed to re-apply filter:', error);
        }
      }
    };

    const handleFilter = (data: IncomeResponse[], startDate?: string, endDate?: string) => {
      setFilteredData(data);
      setIsFilterActive(true);
      if (startDate && endDate) {
        setCurrentDateRange({ start: startDate, end: endDate });
      }
    }
    const clearFilter = () => {
      setFilteredData([]);
      setIsFilterActive(false);
      setCurrentDateRange(null);
    };


  return (
    <div className="">
      <div className="flex items-center gap-1 text-md mb-4">
        <Home className="w-4 h-4" />
        <span>/Add Income</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Add Income</h1>
      <div className="grid grid-cols-1 items-center lg:grid-cols-4 gap-4">
        <BalanceCard refreshTrigger={refreshTrigger} />
        <IncomeForm onSuccess={handleRefresh} />
      </div>
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-4 my-4 h-70">

      <IncomeLineChart />
      <IncomeBarChart />
      </div>
          <DateFilter fetchService={getIncomeByDateRangeService} onFilter={handleFilter} />
            
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
      <IncomeTable  refreshTrigger={refreshTrigger} filteredData={isFilterActive ? filteredData : null} onSuccess={handleRefresh} />
    </div>
  );
}

export default Income;
