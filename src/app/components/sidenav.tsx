"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wallet,
  ArrowUp,
  ArrowDown,
  PiggyBank,
  TrendingUp,
  Menu,
  LayoutDashboard,
} from "lucide-react";

const dashboardData = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-6 w-6" />,
    color: "bg-red-900",
  },
  {
    title: "Balance",
    href: "/dashboard/balance",
    icon: <Wallet className="h-6 w-6" />,
    color: "bg-blue-800",
  },
  {
    title: "Income",
    href: "/dashboard/income",
    icon: <ArrowUp className="h-6 w-6" />,
    color: "bg-green-500",
  },
  {
    title: "Expenses",
    href: "/dashboard/expenses",
    icon: <ArrowDown className="h-6 w-6" />,
    color: "bg-red-500",
  },
  {
    title: "Savings",
    href: "/dashboard/savings",
    icon: <PiggyBank className="h-6 w-6" />,
    color: "bg-[var(--color2)]",
  },
  {
    title: "Investments",
    href: "/dashboard/investments",
    icon: <TrendingUp className="h-6 w-6" />,
    color: "bg-blue-500",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex ${
          collapsed ? "w-20" : "w-64"
        } bg-[var(--color1)] text-white transition-all duration-500 ease-in-out flex-col h-screen fixed left-0 top-0 z-50`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-4 hover:bg-[#2a2a2a] flex items-center justify-center transition-colors duration-200"
        >
          <Menu className="h-6 w-6" />
        </button>

        <nav className="flex-1 mt-4 space-y-2">
          {dashboardData.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
                  isActive ? "bg-[var(--color2)]" : "hover:bg-[#2a2a2a]"
                }`}
              >
                <div
                  className={`p-2 rounded-lg flex items-center justify-center transition-transform duration-300 ${
                    isActive ? "bg-[var(--color2)]" : item.color
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`text-sm font-medium transition-all duration-300 ${
                    collapsed
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--color1)] text-white flex justify-around items-center h-20 z-50 shadow-lg ">
        {dashboardData.map((item, i) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={i}
              href={item.href}
              className="flex flex-col items-center justify-center text-xs transition-colors"
            >
              <div
                className={`p-2 rounded-lg flex items-center justify-center ${
                  isActive ? "border-[var(--color2)]  border-2" : item.color
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[10px] mt-1 ${
                  isActive ? "text-[var(--color2)] font-semibold" : ""
                }`}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
