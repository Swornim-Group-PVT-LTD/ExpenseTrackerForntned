"use client";

import {useAuth} from "@/context/AuthContext";

import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  TextInput,
} from "flowbite-react";
import {
  ArrowDown,
  ArrowUp,
  PiggyBank,
  Wallet,
  TrendingUp,
  PlusCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dashboardData = [
  {
    title: "Balance",
    value: "$12,500",
    icon: <Wallet className="h-6 w-6" />,
    color: "bg-blue-800",
  },
  {
    title: "Income",
    value: "$5,000",
    icon: <ArrowUp className="h-6 w-6" />,
    color: "bg-green-500",
  },
  {
    title: "Expenses",
    value: "$2,700",
    icon: <ArrowDown className="h-6 w-6" />,
    color: "bg-red-500",
  },
  {
    title: "Savings",
    value: "$3,200",
    icon: <PiggyBank className="h-6 w-6" />,
    color: "bg-[var(--color2)]",
  },
  {
    title: "Investments",
    value: "$1,600",
    icon: <TrendingUp className="h-6 w-6" />,
    color: "bg-blue-500",
  },
];

const sampleExpenses = [
  { id: 1, title: "Groceries", amount: 45.0, date: "2025-07-25" },
  { id: 2, title: "Electricity Bill", amount: 120.0, date: "2025-07-24" },
  { id: 3, title: "Internet", amount: 30.0, date: "2025-07-22" },
];

export default function Dashboard() {
  const [expenses, setExpenses] = useState(sampleExpenses);

  // Modal state
  const [openModal, setOpenModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExpense = () => {
    if (!formData.title || !formData.amount || !formData.date) return;

    const newExpense = {
      id: expenses.length + 1,
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: formData.date,
    };

    setExpenses([newExpense, ...expenses]);
    setFormData({ title: "", amount: "", date: "" });
    setOpenModal(false);
  };

  const {user} = useAuth();

  return (
    <main className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back, <span className="text-[var(--color2)]">{user?.first_name}</span>
        </h1>
        <Button
          style={{ backgroundColor: "#f7bc4c" }}
          className="flex gap-2 w-full sm:w-auto text-black font-semibold hover:brightness-110 transition"
          onClick={() => setOpenModal(true)}
        >
          <PlusCircle size={20} /> Add Expense
        </Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 my-8">
        {dashboardData.map((item, idx) => (
          <Card
            key={idx}
            className="shadow-md hover:shadow-lg transition-shadow bg-[var(--color1)] border-none"
          >
            <div className="flex items-center gap-4 p-4 sm:p-6">
              <div className={`p-3 rounded-full text-white ${item.color}`}>
                {item.icon}
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-200">
                  {item.title}
                </h2>
                <p className="text-lg sm:text-xl font-bold text-white">
                  {item.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="p-4 sm:p-6 shadow-md bg-[var(--color1)] border-none">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
          Expense Trend
        </h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={expenses}
              margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
              <XAxis dataKey="date" stroke="#fff" tick={{ fill: "#fff" }} />
              <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#f7bc4c" }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#f7bc4c"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: "#f7bc4c" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Expenses List */}
      <Card className="shadow-md rounded-2xl mt-10 bg-[var(--color1)] border-none">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">
            Recent Expenses
          </h2>
          <ul className="divide-y divide-gray-700">
            {expenses.map((expense) => (
              <motion.li
                key={expense.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="py-3 flex justify-between items-center text-white"
              >
                <span className="text-sm sm:text-base">{expense.title}</span>
                <div className="text-right">
                  <p className="text-sm sm:text-base font-medium text-[var(--color2)]">
                    ${expense.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">{expense.date}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Add Expense Modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
        <ModalHeader className="!bg-[var(--color1)] text-white">
          Add Expense
        </ModalHeader>
        <ModalBody className="space-y-4 !bg-[var(--color1)]">
          <div>
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <TextInput
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter expense title"
              required
            />
          </div>
          <div>
            <Label htmlFor="amount" className="text-white">
              Amount
            </Label>
            <TextInput
              id="amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <Label htmlFor="date" className="text-white">
              Date
            </Label>
            <TextInput
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </ModalBody>
        <ModalFooter className="!bg-[var(--color1)]">
          <Button
            style={{ backgroundColor: "#f7bc4c" }}
            className="text-black font-semibold hover:brightness-110 transition"
            onClick={handleAddExpense}
          >
            Add
          </Button>
          <Button
            color="gray"
            className="dark:bg-gray-700 dark:text-white"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </main>
  );
}
