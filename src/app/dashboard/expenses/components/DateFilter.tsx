import { ChevronDown } from "lucide-react";
import { Datepicker } from "flowbite-react";
import { div } from "framer-motion/client";

export default function DateFilter() {
  return (
    <div className="flex justify-between">

    <div className="flex items-center gap-2 my-8">


      <span className="text-md font-bold">From</span>
      <Datepicker />
      
      <span className="text-md font-bold">To</span>
      <Datepicker />
   
      
      
      <button className="bg-[#FFAA00] hover:bg-[#FFAA00]/90 text-white font-bold text-md px-4 h-12 rounded transition-colors">
        Search
      </button>
    </div>
    <div className="flex items-center gap-2 mb-4">
      <img src="/excel-logo.svg" alt="excel_logo" className="w-12 h-12 object-cover" />
      <img src="/pdf-logo.svg" alt="excel_logo " className="w-12 h-12 object-cover" />

    </div>
    </div>
  );
}