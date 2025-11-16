import { ChevronDown } from "lucide-react";

export default function BalanceForm() {
  return (
    <div className="bg-white rounded-md p-4 mb-4 w-lg">
      <div className="flex gap-2 items-center">
        <div className="relative">
          <select className="appearance-none w-16 h-12 px-2 text-md font-bold text-[#716A6A] border border-[#574A4A]/50 rounded cursor-pointer bg-white">
            <option>$</option>
            <option>₹</option>
            <option>€</option>
          </select>
          <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#716A6A] font-bold pointer-events-none" />
        </div>
        
        <input
          type="number"
          placeholder="400000"
          className="flex-1 h-12 px-3 text-sm text-[#716A6A] border border-[#574A4A]/50 rounded outline-none focus:border-[#FFA726]"
          defaultValue="400000"
        />
        
        <button className="bg-[#FFAA00] hover:bg-[#FFAA00]/90 text-white font-bold text-md px-6 h-12 rounded transition-colors">
          Add
        </button>
      </div>
    </div>
  );
}