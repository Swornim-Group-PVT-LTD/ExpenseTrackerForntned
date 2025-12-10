import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface StatCardProps {
  icon: string;
  label: string;
  value: string | ReactNode;
  percentage: string;
  labelColor: string;
}

export default function StatCard({
  icon,
  label,
  value,
  percentage,
  labelColor,
}: StatCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/${label.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md p-3 flex flex-col gap-2 h-36 mt-2 hover:shadow-lg transition-shadow hover:scale-[1.02] hover:cursor-pointer"
    >
      <div className="relative flex items-start gap-2 mb-1">
        <img
          src={icon}
          alt={label}
          className="absolute -top-8 left-6 w-12 h-12 md:w-16 md:h-16 shrink-0"
        />
        <div className="flex flex-col items-end w-full align-bottom min-w-0">
          <div className="text-xl font-bold mb-1" style={{ color: labelColor }}>
            {label}
          </div>
          <div className="text-2xl font-bold text-[#07371B] mb-1">{value}</div>
        </div>
      </div>
      <div className="text-xl flex justify-between">
        <span className="font-bold text-[#07371B]">Your {label}</span>
        <div className="relative w-32" onClick={(e) => e.stopPropagation()}>
          <select
            name=""
            id=""
            className="appearance-none w-full  py-1 px-2 text-md font-bold text-[#716A6A] border border-[#574A4A]/50 rounded-lg bg-white cursor-pointer"
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#716A6A] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
