import { ChevronDown } from "lucide-react";
import { Datepicker } from "flowbite-react";

import { useState } from "react";
import { format } from "path";

export default function DateFilter({
  fetchService,
  onFilter,
}: {
  fetchService: Function;
  onFilter: Function;
}) {
  const [from, setFrom] = useState<Date | undefined>(undefined);
  const [to, setTo] = useState<Date | undefined>(undefined);
  const [error, setError] = useState<string>("");

  const formatLocalDate = (d:Date) =>
  d ? new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0]
    : "";

  const handleSearch = async () => {
    setError("");

    if (from && to && from > to) {
      setError("'From' date cannot be later than 'To' date.");
      return;
    }

    const start_date = from ? formatLocalDate(from) : "";
    const end_date = to ? formatLocalDate(to) : "";
   


    try {
      const response = await fetchService(start_date, end_date);
      onFilter(response);
     
      
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

        <button
          className="bg-[#FFAA00] hover:bg-[#FFAA00]/90 text-white font-bold text-md px-4 h-12 rounded transition-colors"
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
          className="w-12 h-12 object-cover"
        />
        <img
          src="/pdf-logo.svg"
          alt="excel_logo "
          className="w-12 h-12 object-cover"
        />
      </div>
    </div>
  );
}
