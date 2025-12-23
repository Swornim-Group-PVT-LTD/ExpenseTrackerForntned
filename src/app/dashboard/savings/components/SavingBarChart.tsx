



import {useState,useEffect} from 'react';
import { monthlyBarChartService } from '@/app/services/chartService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';



const MonthlySavingsChart = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [monthlySavings, setMonthlySavings] = useState<{month: string, amount: number}[]>([]);

    useEffect(() => {
    const fetchMonthlySavings = async () => {
      try {
        const response = await monthlyBarChartService('savings');
        const transformedData = response.months.map((month: string, index: number) => ({
          month: month.substring(0, 3),
          amount: Number(response.totals[index])
        }));

        // Get only the latest 4 months with non-zero data
        const filteredData = transformedData.slice(-4);
        setMonthlySavings(filteredData);
      } catch (error) {
        console.error("Error fetching monthly savings:", error);
      }
    };

    fetchMonthlySavings();
  }, [refreshTrigger]);
  return (
    <div style={{ width: '100%', height: '100%', marginTop: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySavings} margin={{ left: 10 }}>

              {/* Y-Axis (with amount labels) */}
              <YAxis
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

export default MonthlySavingsChart;
