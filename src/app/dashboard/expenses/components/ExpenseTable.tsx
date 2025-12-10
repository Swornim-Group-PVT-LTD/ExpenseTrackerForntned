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
  getExpenseService,
  deleteExpenseService,
  updateExpenseService,
} from "@/app/services/expenseService";
import { ExpenseResponse } from "../../../types/expenseType";

import { getExpenseCategoriesService } from "@/app/services/catalogueServices/expenseCatalogueService";
import { ExpenseCategoryResponse } from "@/app/types/catalolgueType/expenseCatalogueType";

interface BalanceCardProps {
  refreshTrigger: number;
}

export default function ExpensesTable({
  refreshTrigger,
  filteredData,
  onSuccess,
  onDataLoad,
}: {
  refreshTrigger: number;
  filteredData?: ExpenseResponse[] | null;
  onSuccess: () => void;
  onDataLoad?: (data: ExpenseResponse[]) => void;
}) {
  const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingSn, setEditingSn] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    add_expenses: 0,
    expense_category: "",
  });

  const [categories, setCategories] = useState<ExpenseCategoryResponse[]>([]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await getExpenseService();
      setExpenses(data);
      onDataLoad && onDataLoad(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getExpenseCategoriesService();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch expense categories:", err);
      toast.error("Failed to fetch expense categories");
    }
  };

  useEffect(() => {
    // Only fetch all data if no filter is active
    if (filteredData) {
      setExpenses(filteredData);
      setLoading(false);
    } else {
      fetchExpenses();
    }
    fetchCategories();
  }, [refreshTrigger, filteredData]);

  // Start editing a row
  const startEdit = (item: any) => {
    setEditingSn(item.sn);
    setEditForm({
      add_expenses: item.add_expenses,
      expense_category: item.expense_category,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingSn(null);
    setEditForm({ add_expenses: 0, expense_category: "" });
  };

  // Save update
  const saveEdit = async (sn: string) => {
    try {
      await updateExpenseService(sn, {
        add_expenses: editForm.add_expenses,
        expense_category: editForm.expense_category,
      });
      onSuccess && onSuccess();
      toast.success("Expense updated successfully");
      setExpenses((prev) =>
        prev.map((item) =>
          item.sn === sn
            ? {
                ...item,
                add_expenses: editForm.add_expenses,
                expense_category: editForm.expense_category,
              }
            : item
        )
      );

      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  const handleDelete = (sn: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    try {
      deleteExpenseService(sn);
      onSuccess && onSuccess();
      toast.success("Expense deleted successfully");
      setExpenses(expenses.filter((expense) => expense.sn !== sn));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table striped>
        {/* TableHead */}
        <TableHead className="text-lg">
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Expenses</TableHeadCell>
            <TableHeadCell>Remarks</TableHeadCell>
            <TableHeadCell>Total Expenses</TableHeadCell>
            <TableHeadCell>Added Date</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableRow>
        </TableHead>

        {/* TableBody */}
        <TableBody className="divide-y">
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center font-medium text-gray-500"
              >
                <ClipLoader size={22} color="#000000" />
              </TableCell>
            </TableRow>
          ) : expenses.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center font-medium text-gray-500"
              >
                No expenses found
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((row) => (
              <TableRow
                key={row.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  {row.symbol || "NPR"} {row.add_expenses}
                </TableCell>
                <TableCell>{row.expense_category}</TableCell>
                <TableCell>
                  {row.symbol || "NPR"}{" "}
                  {row.total_expenses?.toLocaleString() || "0"}
                </TableCell>
                <TableCell>{row.created_date}</TableCell>
                <TableCell>
                  <button>Edit</button> <button>Delete</button>
                </TableCell>
              </TableRow>
            ))
          )}

          {/* TOTAL EXPENSES BAR */}
          {expenses.length > 0 && (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="flex justify-between items-center p-4 bg-red-500 text-white font-semibold rounded-lg shadow mt-2">
                  <span>Total Expenses</span>
                  <span>
                    {expenses[expenses.length - 1].symbol || "NPR"}{" "}
                    {expenses[
                      expenses.length - 1
                    ].total_expenses?.toLocaleString() || "0"}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
