


import {monthlyBarChartService} from '@/app/services/chartService';
import {useState,useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';



const MonthlyIncomeChart = () => {

  const [monthlyIncomes, setMonthlyIncomes] = useState<{month: string, amount: number}[]>([]);

  useEffect(() => {
    const fetchMonthlyIncomes = async () => {
      try {
        const response = await monthlyBarChartService('incomes');
        const transformedData = response.months.map((month: string, index: number) => ({
          month: month.substring(0, 3),
          amount: Number(response.totals[index])
        }));
        
        // Get only the latest 4 months with non-zero data
        const filteredData = transformedData.slice(-4);
        setMonthlyIncomes(filteredData);
      } catch (error) {
        console.error("Error fetching monthly Incomes:", error);
      }
    };

    fetchMonthlyIncomes();
  }, []);

  return (
    <div style={{ width: '100%', height:'100%', marginTop: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyIncomes} margin={{ left: 10 }}>

          {/* Y-Axis (with amount labels) */}
          <YAxis 
            tick={{ fontSize: 12 }}
          />

          

          <XAxis dataKey="month" />
          <Tooltip />

          <Bar dataKey="amount" fill="#5EAC24">
            {/* Amount labels at top of each bar */}
            <LabelList dataKey="amount" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyIncomeChart;


