"use client";

import React, { useState, useEffect } from "react";
import { getIncomeCategoriesService } from "../../../../services/catalogueServices/incomeCatalogueService";
import { IncomeCategoryResponse } from "../../../../types/catalolgueType/incomeCatalogueType";

import {toast} from "react-toastify";
import { deleteIncomeCategoryService } from "@/app/services/catalogueServices/incomeCatalogueService";

export default function IncomeCatalogueTable({ refreshTrigger }: { refreshTrigger: number }) {
  const [data, setData] = useState<IncomeCategoryResponse[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch income categories from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const categories = await getIncomeCategoriesService();
      console.log("Fetched income categories:", categories);
      setData(categories);
    } catch (err) {
      console.error("Failed to fetch income categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  // Filter data based on search input
  const filteredData = data.filter(
    (item) =>
      item.income_category.toLowerCase().includes(search.toLowerCase()) ||
      item.static_value.toLowerCase().includes(search.toLowerCase())
  );


  const handleDelete = async (id: number) => {
    try{
      if(!confirm("Are you sure you want to delete this income category?")) return;
      await deleteIncomeCategoryService(id);
      toast.success("Income category deleted successfully");
      fetchData(); // Refresh data after deletion
    }catch (err:any){ 
      toast.error(err);
    }
  }

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
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Added Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Static Data</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Income Category</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                Loading rows...
              </td>
            </tr>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2 text-sm text-gray-700">{item.id}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.created_date}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.sn}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.income_category}</td>
                <td className="px-4 py-2 text-sm">
                  <div className="flex justify-end gap-2">
                    <span className="text-green-500 cursor-pointer hover:underline">Update</span>
                    <span className="text-red-500 cursor-pointer hover:underline" onClick={() => handleDelete(item.id)}>Delete</span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
