import { ReactNode } from "react";
import { useRouter } from "next/navigation";

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
      className="bg-white rounded-lg shadow-md p-3 flex flex-col gap-4 h-36 mt-2 hover:shadow-lg transition-shadow hover:scale-[1.02] hover:cursor-pointer"
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
      <div className="text-xl text-right">
        <span className="font-bold text-[#07371B]">{percentage}</span>
        <span className="text-black/70"> than the last week</span>
      </div>
    </div>
  );
}
