"use client";

import React, { useState } from "react";

type ExpenseCatalogue = {
  id: number;
  expenseCategory: string;
  staticData: string;
  addedDate: string;
};

type Props = {
  data: ExpenseCatalogue[];
};

export default function ExpenseCatalogueTable({ data }: Props) {
  const [search, setSearch] = useState("");

  // Filter data based on search
  const filteredData = data.filter(
    (item) =>
      item.expenseCategory.toLowerCase().includes(search.toLowerCase()) ||
      item.staticData.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto w-full mt-4">
      {/* Search Field */}
      <div className="flex justify-end mb-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="px-3 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Table */}
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Expense Category</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Static Data</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Added Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 text-sm text-gray-700">{item.id}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{item.expenseCategory}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{item.staticData}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{item.addedDate}</td>
              <td className="px-4 py-2 text-sm">
                <div className="flex justify-end gap-2">
                  <span className="text-green-500 cursor-pointer hover:underline">Update</span>
                  <span className="text-red-500 cursor-pointer hover:underline">Delete</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
