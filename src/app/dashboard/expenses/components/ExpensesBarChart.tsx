

import {useState,useEffect} from 'react';
import { monthlyBarChartService } from '@/app/services/chartService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const MonthlyExpenseChart = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<{ month: string, amount: number }[]>([]);

  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
      try {
        const response = await monthlyBarChartService('expenses');
        const transformedData = response.months.map((month: string, index: number) => ({
          month: month.substring(0, 3),
          amount: Number(response.totals[index])
        }));

        // Get only the latest 4 months with non-zero data
        const filteredData = transformedData.slice(-4);
        setMonthlyExpenses(filteredData);
      } catch (error) {
        console.error("Error fetching monthly expenses:", error);
      }
    };

    fetchMonthlyExpenses();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', marginTop: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyExpenses} margin={{ left: 10 }}>

          {/* Y-Axis (with amount labels) */}
          <YAxis
            tick={{ fontSize: 12 }}
          />

          <XAxis dataKey="month" />
          <Tooltip />

          <Bar dataKey="amount" fill="#ff4d4d">
            {/* Amount labels at top of each bar */}
            <LabelList dataKey="amount" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenseChart;


