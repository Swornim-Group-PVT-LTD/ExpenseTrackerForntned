"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

import { AddIncomePayload } from "@/app/types/incomeType";
import { addIncomeService } from "@/app/services/incomeService";
import { getTotalIncomeService } from "@/app/services/incomeService";
import { getIncomeCategoriesService } from "@/app/services/catalogueServices/incomeCatalogueService";
import { IncomeCategoryResponse } from "@/app/types/catalolgueType/incomeCatalogueType";

interface IncomeFormProps {
  onSuccess?: () => void;
}

const IncomeForm = ({ onSuccess }: IncomeFormProps) => {
  const [amount, setAmount] = useState<number|"">(0);
  const [currency, setCurrency] = useState("$");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<IncomeCategoryResponse[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  // Fetch income categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getIncomeCategoriesService();
        setCategories(data);

        if (data.length > 0) setRemarks(data[0].income_category);
      } catch (err) {
       
        toast.error("Failed to fetch income categories");
      }
    };

    fetchCategories();
  }, []);

  // Fetch Total Income
  const loadTotalIncome = async () => {
    try {
      const total = await getTotalIncomeService();
      setTotalIncome(total);
    } catch (error) {
      console.error("Failed to fetch total income:", error);
      setTotalIncome(0);
    }
  };

  useEffect(() => {
    loadTotalIncome();
  }, []);

  const handleAddIncome = async () => {
    try {
      setLoading(true);

      const payload: AddIncomePayload = {
        add_income: Number(amount),
        income_category: remarks,
      };

      await addIncomeService(payload);

      toast.success(`Income of ${currency}${amount} added successfully.`);

      setAmount(0);

      onSuccess && onSuccess();
      loadTotalIncome(); // refresh total income after adding
    } catch (error: any) {
      toast.error(error.message || "Failed to add income");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-full lg:col-span-3 h-fit">
      <div className="bg-white rounded-md p-4 w-full h-full flex flex-col gap-4">
        <div className="mb-4 p-3 rounded-lg bg-[#5eac24] border border-[#38A169]/30 flex items-center justify-between">
          <span className="text-md font-semibold text-[#FFFFFF]">
            Total Income
          </span>
          <span className="text-xl font-bold text-[#FFFFFF]">
            {currency}
            {totalIncome?.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-stretch sm:items-center">
          {/* Currency Selector */}
          <div className="relative w-full sm:w-24">
            <select
              className="appearance-none w-full h-12 px-2 text-md font-bold text-[#716A6A] border border-[#574A4A]/50 rounded bg-white cursor-pointer"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option>$</option>
              <option>₹</option>
              <option>€</option>
            </select>
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#716A6A]" />
          </div>

          {/* Amount Input */}
          <input
            type="number"
            placeholder="400000"
            className="flex-1 h-12 px-3 text-sm text-[#716A6A] border border-[#574A4A]/50 rounded outline-none focus:border-[#FFA726]"
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
          />

          {/* Remarks Selector */}
          <div className="relative w-full sm:w-80">
            <select
              className="appearance-none w-full h-12 px-2 text-md font-bold text-[#716A6A] border border-[#574A4A]/50 rounded bg-white cursor-pointer"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.income_category}>
                  {cat.income_category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#716A6A]" />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddIncome}
            disabled={loading}
            className={`bg-[#FFAA00] hover:bg-[#FFAA00]/90 text-white font-bold text-md px-8 h-12 rounded transition-colors disabled:opacity-50 w-full sm:w-auto cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Saving..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeForm;
