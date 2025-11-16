"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  TextInput,
  Select,
} from "flowbite-react";
import { motion } from "framer-motion";
import { Wallet, ArrowUp, ArrowDown, PlusCircle } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleTransactions = [
  { id: 1, title: "Salary", amount: 3000, type: "income", date: "2025-07-25" },
  {
    id: 2,
    title: "Groceries",
    amount: 120,
    type: "expense",
    date: "2025-07-24",
  },
  {
    id: 3,
    title: "Electricity Bill",
    amount: 60,
    type: "expense",
    date: "2025-07-22",
  },
  {
    id: 4,
    title: "Freelance Work",
    amount: 800,
    type: "income",
    date: "2025-07-20",
  },
];

export default function Balance() {
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    date: "",
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  // build chart data dynamically
  const balanceData = transactions.map((t) => ({
    date: t.date,
    income: t.type === "income" ? t.amount : 0,
    expense: t.type === "expense" ? t.amount : 0,
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = () => {
    if (!formData.title || !formData.amount || !formData.date) return;

    const newTransaction = {
      id: transactions.length + 1,
      title: formData.title,
      amount: parseFloat(formData.amount),
      type: formData.type,
      date: formData.date,
    };

    setTransactions([newTransaction, ...transactions]);
    setFormData({ title: "", amount: "", type: "income", date: "" });
    setOpenModal(false);
  };

  return (
    <main className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          Balance Overview
        </h1>
        <Button
          style={{ backgroundColor: "#f7bc4c" }}
          className="flex gap-2 w-full sm:w-auto text-black font-semibold"
          onClick={() => setOpenModal(true)}
        >
          <PlusCircle size={20} /> Add Transaction
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-[var(--color1)] border-none">
          <div className="flex items-center gap-4 p-4 sm:p-6">
            <div className="p-3 rounded-full text-white bg-blue-800">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-100">
                Current Balance
              </h2>
              <p className="text-lg sm:text-xl font-bold text-white">
                ${currentBalance.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow bg-[var(--color1)] border-none">
          <div className="flex items-center gap-4 p-4 sm:p-6">
            <div className="p-3 rounded-full text-white bg-green-500">
              <ArrowUp className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-100">
                Income
              </h2>
              <p className="text-lg sm:text-xl font-bold text-white">
                ${totalIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow bg-[var(--color1)] border-none">
          <div className="flex items-center gap-4 p-4 sm:p-6">
            <div className="p-3 rounded-full text-white bg-red-500">
              <ArrowDown className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-100">
                Expenses
              </h2>
              <p className="text-lg sm:text-xl font-bold text-white">
                ${totalExpense.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart */}
      <Card className="p-4 sm:p-6 shadow-md bg-[var(--color1)] border-none">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
          Income vs Expenses
        </h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={balanceData}
              margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff55" />
              <XAxis dataKey="date" stroke="#fff" tick={{ fill: "#fff" }} />
              <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#333",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#f7bc4c" }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#4ade80"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Transactions List */}
      <Card className="shadow-md rounded-2xl mt-10 bg-[var(--color1)] border-none">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white">
            Recent Transactions
          </h2>
          <ul className="divide-y divide-gray-700">
            {transactions.map((t) => (
              <motion.li
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="py-3 flex justify-between items-center"
              >
                <span className="text-white text-sm sm:text-base">
                  {t.title}
                </span>
                <div className="text-right">
                  <p
                    className={`text-sm sm:text-base font-medium ${
                      t.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">{t.date}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Add Transaction Modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
        <ModalHeader className="!bg-[var(--color1)] text-white">
          Add Transaction
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
              placeholder="Enter transaction title"
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
            <Label htmlFor="type" className="text-white">
              Type
            </Label>
            <Select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
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
            onClick={handleAddTransaction}
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
