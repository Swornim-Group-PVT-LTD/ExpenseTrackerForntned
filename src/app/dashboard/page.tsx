"use client";

import { useEffect, useState } from "react";
import { Home } from "lucide-react";

import StatCard from "@/app/dashboard/components/statcard";
import MonthlyBarChart from "@/app/dashboard/components/MonthlyBarChart";
import ExpensesPieChart from "@/app/dashboard/components/ExpensePieChart";
import ExpensesLineChart from "@/app/dashboard/components/ExpensesLineChart";

import { getBalancesService } from "../services/balanceService";
import { getExpenseService } from "../services/expenseService";

import { BalanceResponse } from "../types/balanceType";
import { ExpenseResponse } from "../types/expenseType";

export default function Dashboard() {
  const [balance, setBalance] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch balance and expenses in parallel
        const [balances, expenses]: [BalanceResponse[], ExpenseResponse[]] =
          await Promise.all([getBalancesService(), getExpenseService()]);

        // Only one balance entry exists
        setBalance(Number(balances?.[0]?.total_balance ?? 0));

        // Sum all expenses for total (convert strings to numbers)
        const total = expenses.reduce(
          (acc, exp) => acc + Number(exp.total_expenses || 0),
          0
        );
        setTotalExpenses(total);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setBalance(0);
        setTotalExpenses(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dashboardData = [
    {
      title: "Income",
      value: "NPR 5,00,000", // static for now
      percentage: "100%",
      icon: "/income-logo.svg",
      labelColor: "#5EAC24",
    },
    {
      title: "Expenses",
      value: loading ? "Loading..." : `NPR ${totalExpenses.toLocaleString()}`,
      percentage: "100%",
      icon: "/expenses-logo.svg",
      labelColor: "#E63F32",
    },
    {
      title: "Saving",
      value: "NPR 5,00,000", // static for now
      percentage: "100%",
      icon: "/saving-logo.svg",
      labelColor: "#4EA890",
    },
    {
      title: "Investment",
      value: "NPR 5,00,000", // static for now
      percentage: "100%",
      icon: "/investment-logo.svg",
      labelColor: "#FFA726",
    },
  ];

  return (
    <main>
      <div className="flex items-center gap-1 text-md mb-4">
        <Home className="w-4 h-4" />
        <span>/Dashboard</span>
      </div>

      <div className="space-y-3 md:space-y-4">
        {/* Dashboard Title + Add Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4 h-16">
            {dashboardData.map((item, index) => (
              <button
                key={index}
                style={{ backgroundColor: item.labelColor }}
                className="text-white text-lg font-bold py-2 px-3 rounded hover:opacity-90 transition shadow-md"
              >
                {`Add ${item.title}`}
              </button>
            ))}
          </div>
        </div>

        {/* Balance + Line Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <StatCard
              icon="/balance-logo.svg"
              label="Balance"
              value={
                loading
                  ? "Loading..."
                  : `NPR ${Number(balance).toLocaleString()}`
              }
              percentage="100%"
              labelColor="#000000"
            />
          </div>

          <div className="lg:col-span-3 rounded-xl">
            <ExpensesLineChart />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {dashboardData.map((item, index) => (
            <StatCard
              key={index}
              icon={item.icon}
              label={item.title}
              value={item.value}
              percentage={item.percentage}
              labelColor={item.labelColor}
            />
          ))}
        </div>

        {/* Bar + Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MonthlyBarChart />
          <ExpensesPieChart />
        </div>
      </div>
    </main>
  );
}
