"use client";

import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import {
  getIncomeService,
  deleteIncomeService,
  updateIncomeService,
} from "@/app/services/incomeService";
import { IncomeResponse } from "@/app/types/incomeType";
import { getIncomeCategoriesService } from "@/app/services/catalogueServices/incomeCatalogueService";
import { IncomeCategoryResponse } from "@/app/types/catalolgueType/incomeCatalogueType";

interface BalanceCardProps {
  refreshTrigger: number;
}

export default function IncomeTable(refreshTrigger: BalanceCardProps) {
  const [income, setIncome] = useState<IncomeResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingSn, setEditingSn] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    add_income: 0,
    income_category: "",
  });

  const [categories, setCategories] = useState<IncomeCategoryResponse[]>([]);
  

  const fetchIncome = async () => {
    setLoading(true);
    try {
      const data = await getIncomeService();
      setIncome(data);
    } catch (error) {
      console.error("Error fetching income:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getIncomeCategoriesService();
      setCategories(data);

 
    } catch (err) {
      console.error("Failed to fetch income categories:", err);
      toast.error("Failed to fetch income categories");
    }
  };

  useEffect(() => {
    fetchIncome();
    fetchCategories();
  }, [refreshTrigger]);

  // Start editing a row
  const startEdit = (item: any) => {
    setEditingSn(item.sn);
    setEditForm({
      add_income: item.add_income,
      income_category: item.income_category,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingSn(null);
    setEditForm({ add_income: 0, income_category: "" });
  };

  // Save update
  const saveEdit = async (sn: string) => {
    try {
      await updateIncomeService(sn, {
        add_income: editForm.add_income,
        income_category: editForm.income_category,
      });

      fetchIncome();

      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  const handleDelete = (sn: string) => {
    if (!confirm("Are you sure you want to delete this income?")) return;
    try {
      deleteIncomeService(sn);
      toast.success("income deleted successfully");
      setIncome(income.filter((income) => income.sn !== sn));
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead className="text-lg">
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Income</TableHeadCell>
            <TableHeadCell>Remarks</TableHeadCell>
            <TableHeadCell>Total Income</TableHeadCell>
            <TableHeadCell>Created Date</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody className="divide-y">
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center font-medium text-gray-500"
              >
                <ClipLoader size={22} color="#000000" />
              </TableCell>
            </TableRow>
          ) : income.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center font-medium text-gray-500"
              >
                No income found
              </TableCell>
            </TableRow>
          ) : (
            income.map((row) => (
              <TableRow
                key={row.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {row.id}
                </TableCell>
                <TableCell>
                  NPR{" "}
                  {editingSn === row.sn ? (
                    <input
                      className="border p-1"
                      value={editForm.add_income}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          add_income: Number(e.target.value),
                        }))
                      }
                    />
                  ) : (
                    row.add_income
                  )}
                </TableCell>
                <TableCell>
                  {editingSn === row.sn ? (
                    <select
                      className="border p-1 rounded"
                      value={editForm.income_category}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          income_category: e.target.value,
                        }))
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.income_category}>
                          {cat.income_category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    row.income_category
                  )}
                </TableCell>
                <TableCell>NPR {row.total_income.toLocaleString()}</TableCell>
                <TableCell>{row.created_date}</TableCell>
                <TableCell>
                  {editingSn === row.sn ? (
                    <>
                      <button
                        className="text-green-600 mr-2"
                        onClick={() => saveEdit(row.sn)}
                      >
                        Save
                      </button>
                      <button className="text-gray-600" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-blue-600"
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
