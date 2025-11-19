"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

import { AddIncomePayload } from "@/app/types/incomeType";
import { addIncomeService } from "@/app/services/incomeService";
import { getIncomeCategoriesService } from "@/app/services/catalogueServices/incomeCatalogueService";
import { IncomeCategoryResponse } from "@/app/types/catalolgueType/incomeCatalogueType";

const IncomeForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState("$");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<IncomeCategoryResponse[]>([]);

  // Fetch income categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getIncomeCategoriesService();
        setCategories(data);

        // Set default selected value if data exists
        if (data.length > 0) setRemarks(data[0].income_category);
      } catch (err) {
        console.error("Failed to fetch income categories:", err);
        toast.error("Failed to fetch income categories");
      }
    };

    fetchCategories();
  }, []);

  const handleAddIncome = async () => {
    try {
      setLoading(true);

      const payload: AddIncomePayload = {
        add_income: amount,
        income_category: remarks,
      };

      await addIncomeService(payload);

      toast.success(`Income of ${currency}${amount} added successfully.`);

      setAmount(0); // Reset amount
    } catch (error: any) {
      toast.error(error.message || "Failed to add income");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-full lg:col-span-3 h-fit">
      <div className="bg-white rounded-md p-4 w-full">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-stretch sm:items-center">

          {/* Currency Selector */}
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
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#716A6A] font-bold pointer-events-none" />
          </div>

          {/* Amount Input */}
          <input
            type="number"
            placeholder="400000"
            className="flex-1 h-12 px-3 text-sm text-[#716A6A] border border-[#574A4A]/50 rounded outline-none focus:border-[#FFA726]"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          {/* Remarks Selector */}
          <div className="relative w-full sm:w-80">
            <select
              className="appearance-none w-full h-12 px-2 text-md font-bold text-[#716A6A] border border-[#574A4A]/50 rounded cursor-pointer bg-white"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.income_category}>
                  {cat.income_category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#716A6A] font-bold pointer-events-none" />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddIncome}
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

export default IncomeForm;
