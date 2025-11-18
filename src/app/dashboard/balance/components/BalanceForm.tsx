"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Swal from "sweetalert2";
import { addBalanceService, getBalancesService } from "../../../services/balanceService";
import { AddBalancePayload, BalanceResponse } from "../../../types/balanceType";

export default function BalanceForm() {
  const [amount, setAmount] = useState<number>(400000);
  const [currency, setCurrency] = useState("$");
  const [loading, setLoading] = useState(false);
  const [balanceExists, setBalanceExists] = useState(false);

  // Check if balance exists but DO NOT show popup here
  useEffect(() => {
    const checkBalance = async () => {
      try {
        const balances: BalanceResponse[] = await getBalancesService();
        if (balances.length > 0) {
          setBalanceExists(true);
        }
      } catch (error) {
        console.error("Error checking balance:", error);
      }
    };

    checkBalance();
  }, []);

  const handleAddBalance = async () => {
    if (balanceExists) {
      Swal.fire({
        icon: "info",
        title: "Balance Already Added",
        text: "Balance has been added. Now add the rest through Income.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      setLoading(true);

      const payload: AddBalancePayload = {
        add_opening_balance: amount,
      };

      await addBalanceService(payload);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Balance of ${currency}${amount} added successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });

      setAmount(0);
      setBalanceExists(true);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message || "Failed to add balance",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-md p-4 mb-4 w-lg">
      <div className="flex gap-2 items-center">
        {/* Currency Selector */}
        <div className="relative">
          <select
            className="appearance-none w-16 h-12 px-2 text-md font-bold text-[#716A6A] border border-[#574A4A]/50 rounded cursor-pointer bg-white"
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

        {/* Submit Button */}
        <button
          onClick={handleAddBalance}
          disabled={loading}
          className="bg-[#FFAA00] hover:bg-[#FFAA00]/90 text-white font-bold text-md px-6 h-12 rounded transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add"}
        </button>
      </div>
    </div>
  );
}
