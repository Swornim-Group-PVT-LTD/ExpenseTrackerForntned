"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

import { AddSavingPayload } from "@/app/types/savingType";
import { addSavingService } from "@/app/services/savingService";
import { getSavingCategoriesService } from "@/app/services/catalogueServices/savingCatalogueService";
import { SavingCategoryResponse } from "@/app/types/catalolgueType/savingCatalogueType";

const SavingForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState("$");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [deductBalance, setDeductBalance] = useState(false);
  const [categories, setCategories] = useState<SavingCategoryResponse[]>([]);

  // Fetch saving categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getSavingCategoriesService();
        setCategories(data);

        // Set default selected value if categories exist
        if (data.length > 0) setRemarks(data[0].saving_category);
      } catch (err) {
        console.error("Failed to fetch saving categories:", err);
        toast.error("Failed to fetch saving categories");
      }
    };

    fetchCategories();
  }, []);

  const handleAddSaving = async () => {
    try {
      setLoading(true);

      const payload: AddSavingPayload = {
        add_saving: amount,
        saving_category: remarks,
        want_to_deduct_from_balance: deductBalance,
      };

      await addSavingService(payload);

      toast.success(
        `Saving of ${currency}${amount} added successfully!` +
          (deductBalance ? " (Deducted from balance)" : "")
      );

      setAmount(0);
      setDeductBalance(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to add saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-full lg:col-span-3 h-fit">
      <div className="bg-white rounded-md p-4 w-full flex flex-col gap-4">

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
                <option key={cat.id} value={cat.saving_category}>
                  {cat.saving_category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#716A6A]" />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddSaving}
            disabled={loading}
            className="bg-[#FFAA00] hover:bg-[#FFAA00]/90 text-white font-bold text-md px-8 h-12 rounded transition-colors disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? "Saving..." : "Add"}
          </button>
        </div>

        {/* Deduct from balance checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="deductBalance"
            checked={deductBalance}
            onChange={(e) => setDeductBalance(e.target.checked)}
            className="h-4 w-4 accent-[#FFAA00]"
          />
          <label htmlFor="deductBalance" className="text-sm font-medium">
            Deduct From Balance
          </label>
        </div>

      </div>
    </div>
  );
};

export default SavingForm;
