import React from 'react'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { dailyLineChartService } from '@/app/services/chartService';
import {useState,useEffect} from 'react'; 


const ExpensesLineChart = ({ refreshTrigger }: { refreshTrigger: number }) => {

  const [chartData, setChartData] = useState<{day: string, amount: number}[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await dailyLineChartService('expenses');
        const transformedData = response.dates.map((date: string, index: number) => ({
          day: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          amount: Number(response.totals[index])
        }));
        setChartData(transformedData);
      } catch (error) {
        console.error('Error fetching expense chart data:', error);
      }
    };
    fetchChartData();
  }, [refreshTrigger]);

  return (
    // <div className='w-full h-64 bg-white rounded-lg my-8 flex justify-center items-center'>
    //   <h1 className='font-bold text-md'>No Data Found</h1>
    // </div>

    <div style={{ width: "100%", height: "100%", marginTop: "20px", backgroundColor: "white", borderRadius: "8px" }}>
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={chartData} margin={{ left: 10, right: 20 }}>
      
      {/* Y-Axis */}
      <YAxis
        tick={{ fontSize: 12 }}
      />

      {/* X-Axis */}
      <XAxis 
        dataKey="day"
        tick={{ fontSize: 12 }}
        interval="preserveStartEnd"
      />

      <Tooltip />

      {/* Line */}
      <Line 
        type="monotone" 
        dataKey="amount" 
        stroke="#ff4d4d"  
        strokeWidth={3}
        dot={{ r: 4 }}     // small dots at points
        activeDot={{ r: 6 }} 
      />

    </LineChart>
  </ResponsiveContainer>
</div>

  )
}

export default ExpensesLineChart
