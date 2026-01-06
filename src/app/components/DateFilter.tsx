import { ChevronDown } from "lucide-react";
import { Datepicker } from "flowbite-react";

import { useState } from "react";
import { format } from "path";

interface DateFilterProps {
  fetchService: Function;
  onFilter: Function;
  categories: any[];
  categoryKey: string;
  onDownloadPDF?: () => void;
  onDownloadExcel?: () => void;
}

export default function DateFilter({
  fetchService,
  onFilter,
  categories,
  categoryKey,
  onDownloadPDF,
  onDownloadExcel,
}: DateFilterProps) {
  const [from, setFrom] = useState<Date | undefined>(new Date());
  const [to, setTo] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [error, setError] = useState<string>("");

  const formatLocalDate = (d: Date) =>
    d ? new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]
      : "";

  const handleSearch = async () => {
    setError("");

    // Validate date range if both dates are provided
    if (from && to && from > to) {
      setError("'From' date cannot be later than 'To' date.");
      return;
    }

    const start_date = from ? formatLocalDate(from) : undefined;
    const end_date = to ? formatLocalDate(to) : undefined;
    console.log("Fetching data from", start_date, "to", end_date, "for category", selectedCategory);

    try {
      const response = await fetchService(start_date, end_date, selectedCategory || undefined);
      onFilter(response, start_date, end_date, selectedCategory);
    } catch (err: any) {
      setError(
        err.message || "Failed to fetch data for the selected date range."
      );
    }
  };

  return (
<div className="flex flex-col lg:flex-row justify-between gap-4">
  {/* Search Controls */}
  <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-2 my-4 sm:my-8">
    
    {/* From Date */}
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <span className="text-md font-bold whitespace-nowrap">From</span>
      <Datepicker
        value={from}
        onChange={(date: Date | null) => {
          setFrom(date || undefined);
        }}
      />
    </div>

    {/* To Date */}
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <span className="text-md font-bold whitespace-nowrap">To</span>
      <Datepicker
        value={to}
        onChange={(date: Date | null) => {
          setTo(date || undefined);
        }}
      />
    </div>

    {/* Category Dropdown */}
    <div className="relative w-full sm:w-64">
      <select
        className="appearance-none w-full h-12 min-h-[48px] px-3 text-md font-bold text-[#716A6A] border border-[#574A4A]/50 rounded-lg bg-white cursor-pointer"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories?.map((cat) => (
          <option key={cat.id} value={cat[categoryKey]}>
            {cat[categoryKey]}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#716A6A] pointer-events-none" />
    </div>

    {/* Search Button */}
    <button
      className="bg-[#FFAA00] hover:bg-[#FFAA00]/90 text-white font-bold text-md px-6 h-12 min-h-[48px] rounded transition-colors cursor-pointer w-full sm:w-auto"
      onClick={handleSearch}
    >
      Search
    </button>
    
    {/* Error Message */}
    {error && <p className="text-red-500 w-full sm:w-auto">{error}</p>}
  </div>

  {/* Export Buttons */}
  <div className="flex items-center justify-center sm:justify-start lg:justify-end gap-3 mb-4 lg:mb-0">
    <img
      src="/excel-logo.svg"
      alt="excel_logo"
      className="w-12 h-12 min-w-[48px] min-h-[48px] object-cover cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onDownloadExcel}
    />
    <img
      src="/pdf-logo.svg"
      alt="pdf_logo"
      className="w-12 h-12 min-w-[48px] min-h-[48px] object-cover cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onDownloadPDF}
    />
  </div>
</div>
  );
}
