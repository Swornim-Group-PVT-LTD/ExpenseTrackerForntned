import { b, div } from "framer-motion/client";
import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Income", value: 60, color: "#5EAC24" },
  { name: "Expenses", value: 40, color: "#4EAABB" },
  { name: "Investment", value: 20, color: "#EE8B44" },
  { name: "Saving", value: 10, color: "#FF6384" },
];

export default function ExpensesPieChart() {
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
      {/* Title OUTSIDE ResponsiveContainer */}
      <h3 style={{ marginBottom: "10px" }}>Expenses</h3>

      <ResponsiveContainer width="100%" height={340} className="bg-white rounded-xl">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
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
