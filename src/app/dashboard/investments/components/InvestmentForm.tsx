"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

import { AddInvestmentPayload } from "@/app/types/investmentType";
import { addInvestmentService, getInvestmentService } from "@/app/services/investmentService";
import { getInvestmentCategoriesService } from "@/app/services/catalogueServices/investmentCatalogueService";
import { InvestmentCategoryResponse } from "@/app/types/catalolgueType/investmentCatalogueType";

interface InvestmentFormProps {
  onSuccess?: () => void;
}

const InvestmentForm = ({ onSuccess }: InvestmentFormProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState("$");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<InvestmentCategoryResponse[]>([]);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);

  // Fetch investment categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getInvestmentCategoriesService();
        setCategories(data);
        if (data.length > 0) setRemarks(data[0].investment_category);
      } catch (err) {
        console.error("Failed to fetch investment categories:", err);
        toast.error("Failed to fetch investment categories");
      }
    };
    fetchCategories();
  }, []);

  // Load latest investment
  const loadTotalInvestment = async () => {
    try {
      const res = await getInvestmentService(); // returns array
      if (res.length > 0) {
        const latest = res[res.length - 1]; // latest entry
        setTotalInvestment(latest.total_investment);
      } else {
        setTotalInvestment(0);
      }
    } catch (err) {
      console.error("Failed to fetch total investment:", err);
      setTotalInvestment(0);
    }
  };

  useEffect(() => {
    loadTotalInvestment();
  }, [onSuccess]);

  const handleAddInvestment = async () => {
    try {
      setLoading(true);
      const payload: AddInvestmentPayload = {
        add_investment: amount,
        investment_category: remarks,
      };
      await addInvestmentService(payload);
      toast.success(`Investment of ${currency}${amount} added successfully!`);
      setAmount(0);
      onSuccess && onSuccess();
      loadTotalInvestment(); // refresh latest
    } catch (error: any) {
      toast.error(error.message || "Failed to add investment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-full lg:col-span-3 h-fit">
      <div className="bg-white rounded-md p-4 w-full flex flex-col gap-4">

        {/* ⭐ Total Investment Display */}
        <div className="mb-4 p-3 rounded-lg bg-[#ffa726] border border-[#3182CE]/30 flex items-center justify-between">
          <span className="text-md font-semibold text-[#ffffff]">Total Investment</span>
          <span className="text-xl font-bold text-[#ffffff]">
            {currency}{totalInvestment?.toLocaleString()}
          </span>
        </div>

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
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#716A6A]" />
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
                <option key={cat.id} value={cat.investment_category}>
                  {cat.investment_category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#716A6A]" />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddInvestment}
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

export default InvestmentForm;
