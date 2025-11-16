"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Swal from "sweetalert2";
import { addBalanceService } from "../../../services/addBalanceService";
import { AddBalancePayload } from "../../../types/balanceType";

export default function BalanceForm() {
  const [amount, setAmount] = useState<number>(400000);
  const [currency, setCurrency] = useState("$");
  const [loading, setLoading] = useState(false);

  const handleAddBalance = async () => {
    try {
      setLoading(true);

      const payload: AddBalancePayload = {
        add_opening_balance: amount,
      };

      const response = await addBalanceService(payload);

      // Success SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Balance of ${currency}${amount} added successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Optionally reset input
      setAmount(0);

    } catch (error: any) {
      // Error SweetAlert
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
