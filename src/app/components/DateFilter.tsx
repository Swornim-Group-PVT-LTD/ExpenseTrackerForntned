import { ChevronDown } from "lucide-react";
import { Datepicker } from "flowbite-react";

import { useState, useEffect } from "react";

interface DateFilterProps {
  fetchService: Function;
  onFilter: Function;
  categories: any[];
  categoryKey: string;
  onDownloadPDF?: () => void;
  onDownloadExcel?: () => void;
  initialFrom?: Date;
  initialTo?: Date;
}

export default function DateFilter({
  fetchService,
  onFilter,
  categories,
  categoryKey,
  onDownloadPDF,
  onDownloadExcel,
  initialFrom,
  initialTo,
}: DateFilterProps) {
  const [from, setFrom] = useState<Date | undefined>(initialFrom || new Date());
  const [to, setTo] = useState<Date | undefined>(initialTo || new Date());
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

  useEffect(() => {
    if (initialFrom && initialTo) {
      handleSearch();
    }
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col gap-4">
        {/* Export Buttons - Top Right */}
        <div className="flex justify-end gap-3 -mb-2">
          {onDownloadExcel && (
            <img
              src="/excel-logo.svg"
              alt="excel_logo"
              className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onDownloadExcel}
            />
          )}
          {onDownloadPDF && (
            <img
              src="/pdf-logo.svg"
              alt="pdf_logo"
              className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onDownloadPDF}
            />
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-4">
          {/* From Date */}
          <div className="flex flex-col gap-1.5 flex-1">
            <span className="text-sm font-semibold text-[#716A6A]">From</span>
            <div className="relative">
              <Datepicker
                value={from}
                onChange={(date: Date | null) => {
                  setFrom(date || undefined);
                }}
              />
            </div>
          </div>

          {/* To Date */}
          <div className="flex flex-col gap-1.5 flex-1">
            <span className="text-sm font-semibold text-[#716A6A]">To</span>
            <div className="relative">
              <Datepicker
                value={to}
                onChange={(date: Date | null) => {
                  setTo(date || undefined);
                }}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col gap-1.5 flex-1 lg:max-w-xs">
            <span className="text-sm font-semibold text-[#716A6A]">Category</span>
            <div className="relative">
              <select
                className="appearance-none w-full h-[42px] px-3 text-sm font-medium text-[#716A6A] border border-gray-200 rounded-lg bg-white cursor-pointer focus:ring-1 focus:ring-[#FFAA00] focus:border-[#FFAA00]"
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
          </div>

          {/* Search Button */}
          <button
            className="bg-[#FFAA00] hover:bg-[#FF9900] text-white font-bold text-lg h-[46px] rounded-lg transition-colors cursor-pointer w-full lg:px-10 lg:w-auto mt-2 lg:mt-0"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
}
