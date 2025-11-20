"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { getExpenseService } from "../../../services/expenseService";
import { ExpenseResponse } from "../../../types/expenseType";


interface BalanceCardProps {
  refreshTrigger: number
}

export default function ExpensesTable({refreshTrigger}: BalanceCardProps) {
  const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const data = await getExpenseService();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [refreshTrigger]);

  return (
    <div className="overflow-x-auto">
      <Table striped>
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

        <TableBody className="divide-y">
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center font-medium text-gray-500">
                Loading...
              </TableCell>
            </TableRow>
          ) : expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center font-medium text-gray-500">
                No expenses found
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((row) => (
              <TableRow
                key={row.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {row.id}
                </TableCell>
                <TableCell>NPR {row.add_expenses.toLocaleString()}</TableCell>
                <TableCell>{row.expense_category}</TableCell>
                <TableCell>NPR {row.total_expenses.toLocaleString()}</TableCell>
                <TableCell>{row.created_date}</TableCell>
                <TableCell>
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Edit
                  </a>{" "}
                  /{" "}
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
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
