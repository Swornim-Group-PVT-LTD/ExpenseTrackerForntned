"use client";

import { ClipLoader } from "react-spinners";
import {toast} from "react-toastify";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";


import { getInvestmentService, deleteInvestmentService,updateInvestmentService } from "@/app/services/investmentService";
import { InvestmentResponse } from "@/app/types/investmentType";
import { getInvestmentCategoriesService } from "@/app/services/catalogueServices/investmentCatalogueService";
import { InvestmentCategoryResponse } from "@/app/types/catalolgueType/investmentCatalogueType";
import { on } from "events";

export default function InvestmentTable({refreshTrigger,filteredData,onSuccess,onDataLoad}: {refreshTrigger: number;filteredData?: InvestmentResponse[] | null;onSuccess: () => void;onDataLoad?: (data: InvestmentResponse[]) => void;}) {
  const [investment, setInvestment] = useState<InvestmentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingSn, setEditingSn] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({add_investment:0, investment_category:""});
    const [categories, setCategories] = useState<InvestmentCategoryResponse[]>([]);

    const fetchCategories = async () => {
      try {
        const data = await getInvestmentCategoriesService();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch investment categories:", err);
      }
    };


    const fetchInvestment = async () => {
      setLoading(true);
      try {
        const data = await getInvestmentService();
        setInvestment(data);
        onDataLoad && onDataLoad(data);
      } catch (error) {
        console.error("Error fetching Investment:", error);
      } finally {
        setLoading(false);
      }
    };
useEffect(() => {
  // Only fetch all data if no filter is active
  if (filteredData) {
    setInvestment(filteredData);
    setLoading(false);
  }
  else {
    fetchInvestment();
  }
  fetchCategories();
}, [refreshTrigger, filteredData]);

  // Start editing a row
      const startEdit = (item: any) => {
        setEditingSn(item.sn);
        setEditForm({ add_investment: item.add_investment, investment_category: item.investment_category });
      };
    
      // Cancel editing
      const cancelEdit = () => {
        setEditingSn(null);
        setEditForm({ add_investment: 0, investment_category: "" });
      };
    
      // Save update
      const saveEdit = async (sn: string) => {
        try {
          await updateInvestmentService(sn, {
            add_investment: editForm.add_investment,
            investment_category: editForm.investment_category,
          });

          onSuccess && onSuccess();
          toast.success("Investment updated successfully");
    
                  setInvestment(prev => prev.map(item => 
          item.sn === sn ? { ...item, add_investment: editForm.add_investment, investment_category: editForm.investment_category } : item
        ));
      
    
          cancelEdit();
        } catch (err) {
          console.error(err);
          alert("Failed to update");
        }
      };
    
    
    
      const handleDelete = (sn: string) => {
        if (!confirm("Are you sure you want to delete this investment?")) return;
          try{
            deleteInvestmentService(sn);
            onSuccess && onSuccess();
            toast.success("investment deleted successfully");
            setInvestment(investment.filter(investment => investment.sn !== sn));
          }catch(error){
            console.error("Error deleting investment:", error);
          }
      }
      

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead className="text-lg">
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Investment</TableHeadCell>
            <TableHeadCell>Remarks</TableHeadCell>
            <TableHeadCell>Total Investment</TableHeadCell>
            <TableHeadCell>Created Date</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody className="divide-y">
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center font-medium text-gray-500">
                <ClipLoader size={22} color="#000000" />
              </TableCell>
            </TableRow>
          ) : investment.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center font-medium text-gray-500">
                No Investment found
              </TableCell>
            </TableRow>
          ) : (
            investment.map((row) => (
              <TableRow
                key={row.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {row.id}
                </TableCell>
                <TableCell>{row.symbol || "NPR"}{" "} {editingSn === row.sn ? (
                <input
                  className="p-2 border rounded-md border-gray-300"
                  value={editForm.add_investment}
                  onChange={e => setEditForm(prev => ({ ...prev, add_investment: Number(e.target.value) }))}
                />
              ) : (
                row.add_investment
              )}</TableCell>
                <TableCell>{editingSn === row.sn ? (
                    <select
                      className="p-2 border rounded-md border-gray-300"
                      value={editForm.investment_category}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          investment_category: e.target.value,
                        }))
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.investment_category}>
                          {cat.investment_category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    row.investment_category
                  )}</TableCell>
                <TableCell>{row.symbol || "NPR"}{" "}{row.total_investment.toLocaleString()}</TableCell>
                <TableCell>{row.created_date}</TableCell>
                <TableCell>
                  {editingSn === row.sn ? (
                <>
                  <button
                    className="text-green-600 mr-2 cursor-pointer"
                    onClick={() => saveEdit(row.sn)}
                  >
                    Save
                  </button>
                  <button
                    className="text-gray-600 cursor-pointer"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="text-blue-600 cursor-pointer"
                  onClick={() => startEdit(row)}
                >
                  Edit
                </button>
              )}
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                    onClick={() => handleDelete(row.sn)}
                  >
                    Delete
                  </a>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
