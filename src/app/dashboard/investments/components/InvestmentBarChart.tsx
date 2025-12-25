


import {useState,useEffect} from 'react';
import { monthlyBarChartService } from '@/app/services/chartService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const MonthlyInvestmentChart = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [monthlyInvestments, setMonthlyInvestments] = useState<{ month: string, amount: number }[]>([]);

  useEffect(() => {
    const fetchMonthlyInvestments = async () => {
      try {
        const response = await monthlyBarChartService('investments');
        const transformedData = response.months.map((month: string, index: number) => ({
          month: month.substring(0, 3),
          amount: Number(response.totals[index])
        }));

        // Get only the latest 4 months with non-zero data
        const filteredData = transformedData.slice(-4);
        setMonthlyInvestments(filteredData);
      } catch (error) {
        console.error("Error fetching monthly investments:", error);
      }
    };

    fetchMonthlyInvestments();
  }, [refreshTrigger]);

  return (
    <div style={{ width: '100%', height: '100%', marginTop: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyInvestments} margin={{ left: 10 }}>

          {/* Y-Axis (with amount labels) */}
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            interval={0}
            tickCount={6}
          />

          <XAxis dataKey="month" />
          <Tooltip />

          <Bar dataKey="amount" fill="#FFA726">
            {/* Amount labels at top of each bar */}
            <LabelList dataKey="amount" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyInvestmentChart;