// import React from 'react'

// import {useState,useEffect} from "react";

// import { getExpenseService } from '@/app/services/addExpenseService';
// import { div } from 'framer-motion/client';

// const ExpensesBarChart = () => {

//   const [expenses, setExpenses] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const expenses = await getExpenseService();
//         setExpenses(expenses);
//       } catch (error) {
//         console.error("Error fetching expenses:", error);
//       }
//   }
//     fetchExpenses();
//   }
//   , []);
  
//   return (
// <div> 
//   {/* {expenses.length > 0 ? (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Expenses Bar Chart</h2>
//       <div className='w-full h-64 bg-white rounded-lg mb-8 flex justify-center items-center'>
//         <h1 className='font-bold text-md'>Bar Chart Placeholder</h1>
//       </div>
//       <div className='w-full h-64 bg-white rounded-lg mb-8 flex justify-center items-center'>
//         <h1 className='font-bold text-md'>Bar Chart Placeholder</h1>
//       </div>
//     </div>
//   ) : (
//     <p>No expenses available.</p>
//   )} */}




// </div>
//   )

// }

// export default ExpensesBarChart



import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const monthlyExpenses = [
  { month: 'Jan', amount: 420 },
  { month: 'Feb', amount: 380 },
  { month: 'Mar', amount: 500 },
  { month: 'Apr', amount: 450 },

];

const MonthlyExpenseChart = () => {
  return (
    <div style={{ width: '100%', height:'100%', marginTop: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyExpenses} margin={{ left: 10 }}>
          
          {/* Y-Axis (with amount labels) */}
          <YAxis 
            dataKey="amount"
            ticks={[0, 100, 200, 300, 400, 500, 600]}
            tick={{ fontSize: 12 }}
          />

          

          <XAxis dataKey="month" />
          <Tooltip />

          <Bar dataKey="amount" fill="#44EEAA">
            {/* Amount labels at top of each bar */}
            <LabelList dataKey="amount" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenseChart;


