"use client";

import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import ExpenseCatalogueForm from "./components/expenseCatalogueForm";
import ExpenseCatalogueTable from "./components/expenseCatalogueTable";

export default function ExpenseCatalogueUI() {
  const router = useRouter();

  // Mock data for the table
  const tableData = [
    {
      id: 1,
      expenseCategory: "Food",
      staticData: "Lunch",
      addedDate: "2025-11-18",
    },
    {
      id: 2,
      expenseCategory: "Transport",
      staticData: "Bus",
      addedDate: "2025-11-18",
    },
  ];

  return (
    <div className="p-4">
      {/* Breadcrumb & Title */}
      <div className="mb-4">
        <div className="flex items-center gap-1 text-md mb-2">
          <Home className="w-4 h-4" />
          <span>/ Add Expense Catalogue</span>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Add Expense Catalogue</h1>
      </div>
      {/* Form */}
      <ExpenseCatalogueForm />
      <div className="mt-5 mb-10"></div>
      {/* Table */}
      <ExpenseCatalogueTable data={tableData} />
    </div>
  );
}
