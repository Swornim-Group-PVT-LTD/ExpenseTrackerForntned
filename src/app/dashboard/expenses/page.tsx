"use client";

import { useState } from "react";

import { Home } from "lucide-react";

import ExpenseForm from "./components/ExpenseForm";
import BalanceCard from "@/app/components/BalanceCard";
import ExpensesLineChart from "./components/ExpensesLineChart";
import DateFilter from "@/app/components/DateFilter";
import ExpenseTable from "./components/ExpenseTable";
import ExpensesBarChart from "./components/ExpensesBarChart";
import { useEffect } from "react";
import{ toast }from "react-toastify";
import { getExpenseCategoriesService } from "@/app/services/catalogueServices/expenseCatalogueService";
import { ExpenseCategoryResponse } from "@/app/types/catalolgueType/expenseCatalogueType";

import { getExpenseByDateRangeService } from "@/app/services/expenseService";
import { ExpenseResponse } from "@/app/types/expenseType";
import { downloadService } from "@/app/services/downloadService";

function Expenses() {

  
const [categories, setCategories] = useState<ExpenseCategoryResponse[]>([]);
  const [filteredData,setFilteredData] = useState<ExpenseResponse[]>([]);
  const [allData, setAllData] = useState<ExpenseResponse[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [currentDateRange, setCurrentDateRange] = useState<{start: string, end: string} | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
      const handleRefresh = async () => {
    setRefreshTrigger(prev => prev + 1);
    if (isFilterActive) {
      try{
        const response = await getExpenseByDateRangeService(
        currentDateRange?.start,
        currentDateRange?.end,
        currentCategory || undefined
      );
      setFilteredData(response);
      }catch(error){
        console.error('Failed to re-apply filter:', error);
      }
    }
  };

  const handleFilter = (
    data: ExpenseResponse[], 
    startDate?: string, 
    endDate?: string,
    category?: string  // NEW
  ) => {
    setFilteredData(data);
    setIsFilterActive(true);
    setCurrentDateRange(startDate && endDate ? { start: startDate, end: endDate } : null);
    setCurrentCategory(category || null);  // NEW state
  }
      
      const clearFilter = () => {
        setFilteredData([]);
         setIsFilterActive(false);
         setCurrentDateRange(null);
      };

      // Fetch income categories once
        useEffect(() => {
          const fetchCategories = async () => {
            try {
              const data = await getExpenseCategoriesService();
              setCategories(data);
              
            } catch (err) {
             
              toast.error("Failed to fetch expense categories");
            }
          };
      
          fetchCategories();
        }, []);

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

      <ExpensesLineChart refreshTrigger={refreshTrigger} />
      <ExpensesBarChart refreshTrigger={refreshTrigger} />
      </div>
      <DateFilter 
        fetchService={getExpenseByDateRangeService} 
        onFilter={handleFilter} 
        categories={categories} 
        categoryKey="expense_category"
        onDownloadPDF={() => {
          const data = isFilterActive ? filteredData : allData;
          if (data.length === 0) {
            toast.warning("No data to download. Please apply filters or wait for data to load.");
            return;
          }
          downloadService.downloadPDF(
            data,
            [
              { header: "ID", field: "id" },
              { header: "Expense", field: "add_expenses" },
              { header: "Category", field: "expense_category" },
              { header: "Total Expenses", field: "total_expenses" },
              { header: "Date", field: "created_date" },
            ],
            "Expense_Report"
          );
        }}
        onDownloadExcel={() => {
          const data = isFilterActive ? filteredData : allData;
          if (data.length === 0) {
            toast.warning("No data to download. Please apply filters or wait for data to load.");
            return;
          }
          downloadService.downloadExcel(
            data,
            [
              { header: "ID", field: "id" },
              { header: "Expense", field: "add_expenses" },
              { header: "Category", field: "expense_category" },
              { header: "Total Expenses", field: "total_expenses" },
              { header: "Date", field: "created_date" },
            ],
            "Expense_Report"
          );
        }}
      />
            
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
      <ExpenseTable refreshTrigger={refreshTrigger} filteredData={isFilterActive ? filteredData : null} onSuccess={handleRefresh} onDataLoad={setAllData} />
    </div>
  );
}

export default Expenses;
