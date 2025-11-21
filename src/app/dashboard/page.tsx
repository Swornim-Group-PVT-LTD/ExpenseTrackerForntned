"use client";

import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

import StatCard from "@/app/components/statcard";
import MonthlyBarChart from "@/app/components/MonthlyBarChart";
import ExpensesPieChart from "@/app/components/ExpensePieChart";
import ExpensesLineChart from "@/app/components/ExpensesLineChart";

import { getBalancesService } from "../services/balanceService";
import { getExpenseService } from "../services/expenseService";
import { getSavingService } from "../services/savingService";
import { getInvestmentService } from "../services/investmentService";
import { getIncomeService } from "../services/incomeService";

import { BalanceResponse } from "../types/balanceType";
import { ExpenseResponse } from "../types/expenseType";
import { SavingResponse } from "../types/savingType";
import { InvestmentResponse } from "../types/investmentType";
import { IncomeResponse } from "../types/incomeType";

export default function Dashboard() {
  const [balance, setBalance] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalSaving, setTotalSaving] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          balances,
          expenses,
          saving,
          income,
          investment
        ]: [
          BalanceResponse[],
          ExpenseResponse[],
          SavingResponse[],
          IncomeResponse[],
          InvestmentResponse[]
        ] = await Promise.all([
          getBalancesService(),
          getExpenseService(),
          getSavingService(),
          getIncomeService(),
          getInvestmentService()
        ]);

        // Only one balance entry exists
        setBalance(Number(balances?.[0]?.total_balance ?? 0));

        // Latest values only
        setTotalExpenses(Number(expenses?.[expenses.length - 1]?.total_expenses ?? 0));
        setTotalSaving(Number(saving?.[saving.length - 1]?.total_saving ?? 0));
        setTotalIncome(Number(income?.[income.length - 1]?.total_income ?? 0));
        setTotalInvestment(Number(investment?.[investment.length - 1]?.total_investment ?? 0));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setBalance(0);
        setTotalExpenses(0);
        setTotalIncome(0);
        setTotalSaving(0);
        setTotalInvestment(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dashboardData = [
    { title: "Income", value: totalIncome, icon: "/income-logo.svg", labelColor: "#5EAC24" },
    { title: "Expenses", value: totalExpenses, icon: "/expenses-logo.svg", labelColor: "#E63F32" },
    { title: "Savings", value: totalSaving, icon: "/saving-logo.svg", labelColor: "#4EA890" },
    { title: "Investments", value: totalInvestment, icon: "/investment-logo.svg", labelColor: "#FFA726" },
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
                loading ? <ClipLoader size={22} color="#000000" /> : `NPR ${balance.toLocaleString()}`
              }
              percentage="100%"
              labelColor="#000000"
            />
          </div>

          <div className="lg:col-span-3 rounded-xl">
            <ExpensesLineChart />
          </div>
        </div>

        {/* Stats Cards with spinner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {dashboardData.map((item, index) => (
            <StatCard
              key={index}
              icon={item.icon}
              label={item.title}
              value={
                loading ? <ClipLoader size={22} color={item.labelColor} /> : `NPR ${item.value.toLocaleString()}`
              }
              percentage="100%"
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
