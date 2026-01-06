import { ChevronDown } from "lucide-react";
import { Datepicker } from "flowbite-react";

export default function DateFilter() {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4">
      {/* Search Controls */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-2 my-4 sm:my-8">
        
        {/* From Date */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-md font-bold whitespace-nowrap">From</span>
          <Datepicker />
        </div>

        {/* To Date */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-md font-bold whitespace-nowrap">To</span>
          <Datepicker />
        </div>

        {/* Search Button */}
        <button className="bg-[#FFAA00] hover:bg-[#FFAA00]/90 text-white font-bold text-md px-6 h-12 min-h-[48px] rounded transition-colors cursor-pointer w-full sm:w-auto">
          Search
        </button>
      </div>

      {/* Export Buttons */}
      <div className="flex items-center justify-center sm:justify-start lg:justify-end gap-3 mb-4 lg:mb-0">
        <img
          src="/excel-logo.svg"
          alt="excel_logo"
          className="w-12 h-12 min-w-[48px] min-h-[48px] object-cover cursor-pointer hover:opacity-80 transition-opacity"
        />
        <img
          src="/pdf-logo.svg"
          alt="pdf_logo"
          className="w-12 h-12 min-w-[48px] min-h-[48px] object-cover cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    </div>
  );
}