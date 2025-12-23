import { b, div, filter } from "framer-motion/client";
import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { expensePieChartService } from "../services/chartService";
import {useState, useEffect} from 'react';
import { ChevronDown } from "lucide-react";

const data = [
  { name: "Income", value: 60, color: "#5EAC24" },
  { name: "Expenses", value: 40, color: "#4EAABB" },
  { name: "Investment", value: 20, color: "#EE8B44" },
  { name: "Saving", value: 10, color: "#FF6384" },
];

export default function ExpensesPieChart() {

  const [filter_type, setFilterType] = useState('monthly');
  const [pieChartData, setPieChartData] = useState<{name: string, value: number, color: string}[]>([]);

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

  const getDateRange = (filterType: string) => {
    const today = new Date();
    let startDate: Date;
    
    switch (filterType) {
      case 'daily':
        startDate = new Date(today);
        break;
      case 'weekly':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 6); // Last 7 days
        break;
      case 'monthly':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of current month
        break;
      case 'yearly':
        startDate = new Date(today.getFullYear(), 0, 1); // First day of current year
        break;
      default:
        startDate = new Date(today.getFullYear(), 0, 1);
    }
    
    return {
      start: startDate.toISOString().split('T')[0],
      end: today.toISOString().split('T')[0]
    };
  };

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const dateRange = getDateRange(filter_type);
        console.log('Date range:', dateRange);
        const response = await expensePieChartService(filter_type, dateRange.start, dateRange.end);
        console.log('Pie chart response:', response);
        
        if (response.data && response.data.length > 0) {
          const transformedData = response.data.map((item: any, index: number) => ({
            name: item.expense_category,
            value: Number(item.total_amount),
            color: colors[index % colors.length]
          }));
          console.log('Transformed data:', transformedData);
          setPieChartData(transformedData);
        } else {
          // Set fallback data if no data received
          setPieChartData(data);
        }
      } catch (error) {
        console.error('Error fetching expense pie chart data:', error);
        // Set fallback data on error
        setPieChartData(data);
      } 
    };
    fetchPieChartData();
  }, [filter_type]);
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "12px",
      }}
    >

       <div className="relative w-32 mb-4" >
                      <select
                        value={filter_type}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="appearance-none w-full  py-1 px-2 text-sm font-medium text-[#716A6A] border border-[#574A4A]/50 rounded-lg bg-white cursor-pointer"
                      >
                        <option value="yearly">Yearly</option>
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#716A6A] pointer-events-none" />
                    </div>

      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <Pie
            data={pieChartData.length > 0 ? pieChartData : data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={(entry) => `${entry.name}: ${entry.value}`}
          >
            {(pieChartData.length > 0 ? pieChartData : data).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
