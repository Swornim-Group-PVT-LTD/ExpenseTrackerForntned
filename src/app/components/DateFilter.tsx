import { ChevronDown } from "lucide-react";
import { Datepicker } from "flowbite-react";

import { useState } from "react";
import { format } from "path";

interface DateFilterProps {
  fetchService: Function;
  onFilter: Function;
  categories: any[]; // pass categories from parent
  categoryKey: string; // e.g., "income_category"
}

export default function DateFilter({
  fetchService,
  onFilter,
  categories,
  categoryKey,
}: DateFilterProps) {
  const [from, setFrom] = useState<Date | undefined>(undefined);
  const [to, setTo] = useState<Date | undefined>(undefined);
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
    <div className="flex justify-between">
      <div className="flex items-center gap-2 my-8">
        <span className="text-md font-bold">From</span>

        <Datepicker
          value={from}
          onChange={(date: Date | null) => {
            setFrom(date || undefined);
          }}
        />

        <span className="text-md font-bold">To</span>
        <Datepicker
          value={to}
          onChange={(date: Date | null) => {
            setTo(date || undefined);
          }}
        />

        <div className="relative w-64">
          <select
            className="appearance-none w-full h-10 px-3 text-md font-bold text-[#716A6A] border border-[#574A4A]/50 rounded-lg bg-white cursor-pointer"
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
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#716A6A]" />
        </div>

        <button
          className="bg-[#FFAA00] hover:bg-[#FFAA00]/90 text-white font-bold text-md px-4 h-12 rounded transition-colors cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <img
          src="/excel-logo.svg"
          alt="excel_logo"
          className="w-12 h-12 object-cover cursor-pointer"
        />
        <img
          src="/pdf-logo.svg"
          alt="excel_logo "
          className="w-12 h-12 object-cover cursor-pointer"
        />
      </div>
    </div>
  );
}
