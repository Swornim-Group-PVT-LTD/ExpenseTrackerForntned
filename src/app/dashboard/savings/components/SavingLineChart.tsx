import React from 'react'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ExpensesLineChart = () => {

  const dailySavings = [
  { day: 1, amount: 50 },
  { day: 2, amount: 100 },
  { day: 3, amount: 150 },
  { day: 4, amount: 200 },
  { day: 5, amount: 260 },
  { day: 10, amount: 25 },
  { day: 20, amount: 230 },
  // ...
];

  return (
    // <div className='w-full h-64 bg-white rounded-lg my-8 flex justify-center items-center'>
    //   <h1 className='font-bold text-md'>No Data Found</h1>
    // </div>

    <div style={{ width: "100%", height: "100%", marginTop: "20px", backgroundColor: "white", borderRadius: "8px" }}>
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={dailySavings} margin={{ left: 10, right: 20 }}>
      
      {/* Y-Axis */}
      <YAxis
        ticks={[0, 250, 500]}
        tick={{ fontSize: 12 }}
      />

      {/* X-Axis */}
      <XAxis 
        dataKey="day"
        tick={{ fontSize: 12 }}
      />

      <Tooltip />

      {/* Line */}
      <Line 
        type="monotone" 
        dataKey="amount" 
        stroke="#44EEAA"  
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
