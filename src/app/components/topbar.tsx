"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Settings, HelpCircle, LogOut } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
  const [userImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
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

  return (
    <header className="w-full bg-[var(--color1)] shadow-sm px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="text-xl font-semibold text-gray-800"></div>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-500 transition">
          <Bell className="h-6 w-6 text-white" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center focus:outline-none"
          >
            {userImage ? (
              <img
                src={userImage}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover border"
              />
            ) : (
              <img
                src="/default-avatar.png"
                alt="Default Profile"
                className="h-10 w-10 rounded-full object-cover border"
              />
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-[var(--color1)] rounded-lg shadow-lg py-2 z-50">
              <button className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[var(--color2)]">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[var(--color2)]">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </button>
              <Link href="/authentication/login">
                <button className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[var(--color2)]">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
