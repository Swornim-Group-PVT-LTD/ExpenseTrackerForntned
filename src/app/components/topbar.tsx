"use client";

import { ChevronDown, Bell, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState,useEffect,useRef } from "react";
import { useRouter } from "next/navigation";

import { Settings, HelpCircle, LogOut } from "lucide-react";

export default function TopNav() {

  const dropdownRef = useRef<HTMLDivElement>(null);
   const router = useRouter();

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [open, setOpen] = useState(false);
  

  const { user,logout } = useAuth();

  const handleLogout = () => {
    // Clear the access token cookie
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict";

    //remove from localstorage and context
    logout();

    // Redirect to login page
    window.location.href = "/authentication/login";
  }
  
  return (
    <div className=" text-white  h-18 bg-[#133840] shadow-lg z-40 flex items-center justify-between px-3">
      <button className="p-4 hover:bg-[#2a2a2a] flex items-center justify-center transition-colors duration-200">
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex items-center gap-2 pr-2 md:gap-3">
        <span className="text-white text-lg font-bold hidden sm:block">
          Welcome, {user?.first_name}
        </span>

        <div className="relative flex items-center gap-1 " onClick={() => setOpen(!open)}  ref={dropdownRef}>
          <div className="relative" >
            <div className="w-12 h-12 rounded-full bg-[#EFF0F3] flex items-center justify-center" >
              <img
                src="/user.svg"
                alt="User"
                className="w-8 h-8 object-cover"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full "></div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer" />

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--color1)] rounded-lg shadow-lg py-2 z-50">
              <button className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[var(--color2)]" onClick={() => router.push('/settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[var(--color2)]">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </button>

                <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[var(--color2)]">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>

            </div>
          )}
        </div>

        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-[#FDC300] flex items-center justify-center cursor-pointer hover:bg-[#FDC300]/90 transition-colors">
            <Bell className="w-4 h-4 text-[#004299]" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#004299] rounded-full flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
