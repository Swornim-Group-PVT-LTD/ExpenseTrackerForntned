"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

import { AddExpensePayload } from "@/app/types/expenseType";
import { addExpenseService, getExpenseService } from "@/app/services/expenseService";
import { getExpenseCategoriesService } from "@/app/services/catalogueServices/expenseCatalogueService";
import { ExpenseCategoryResponse } from "@/app/types/catalolgueType/expenseCatalogueType";

interface ExpenseFormProps {
  onSuccess?: () => void;
}

const ExpenseForm = ({ onSuccess }: ExpenseFormProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState("$");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ExpenseCategoryResponse[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  // Fetch expense categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getExpenseCategoriesService();
        setCategories(data);

        if (data.length > 0) setRemarks(data[0].expense_category); // default
      } catch (err) {
        console.error("Failed to fetch expense categories:", err);
        toast.error("Failed to fetch expense categories");
      }
    };

    fetchCategories();
  }, []);

  // Load total expense
  const loadTotalExpense = async () => {
    try {
      const res = await getExpenseService(); // your API call
      if (res.length > 0) {
      const latest = res[res.length - 1]; // get the last (latest) entry
      setTotalExpense(latest.total_expenses);
    } else {
      setTotalExpense(0); 
    }
    } catch (err) {
      console.error("Failed to fetch total expense:", err);
    }
  };

  useEffect(() => {
    loadTotalExpense();
  }, [onSuccess]);

  const handleAddExpense = async () => {
    try {
      setLoading(true);

      const payload: AddExpensePayload = {
        add_expenses: amount,
        expense_category: remarks,
      };

      await addExpenseService(payload);
      toast.success(`Expense of ${currency}${amount} added successfully!`);

      setAmount(0); // reset amount
      onSuccess && onSuccess();
      loadTotalExpense(); // refresh total expense after adding
    } catch (error: any) {
      toast.error(error.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-full lg:col-span-3 h-fit">
      <div className="bg-white rounded-md p-4 w-full h-full flex flex-col gap-4">

        {/* ⭐ Total Expense Display */}
        <div className="mb-4 p-3 rounded-lg bg-[#ff4d4d] border border-[#E53E3E]/30 flex items-center justify-between">
          <span className="text-md font-semibold text-[#ffffff]">Total Expense</span>
          <span className="text-xl font-bold text-[#ffffff]">
            {currency}{totalExpense?.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-stretch sm:items-center">

          {/* Currency selector */}
          <div className="relative w-full sm:w-24">
            <select
              className="appearance-none w-full h-12 px-2 text-md font-bold text-[#716A6A] border border-[#574A4A]/50 rounded cursor-pointer bg-white"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option>$</option>
              <option>₹</option>
              <option>€</option>
            </select>
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#716A6A]" />
          </div>

          {/* Amount input */}
          <input
            type="number"
            placeholder="400000"
            className="flex-1 h-12 px-3 text-sm text-[#716A6A] border border-[#574A4A]/50 rounded outline-none focus:border-[#FFA726]"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          {/* Remarks dropdown */}
          <div className="relative w-full sm:w-80">
            <select
              className="appearance-none w-full h-12 px-2 text-md font-bold text-[#716A6A] border border-[#574A4A]/50 rounded cursor-pointer bg-white"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.expense_category}>
                  {cat.expense_category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#716A6A]" />
          </div>

          {/* Submit button */}
          <button
            onClick={handleAddExpense}
            disabled={loading}
            className="bg-[#FFAA00] hover:bg-[#FFAA00]/90 text-white font-bold text-md px-8 h-12 rounded transition-colors disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? "Saving..." : "Add"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
