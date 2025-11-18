"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

import { getIncomeService } from "@/app/services/incomeService";
import { IncomeResponse } from "@/app/types/incomeType";

export default function IncomeTable() {
  const [income, setIncome] = useState<IncomeResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchIncome();
  }, []);

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
              <TableCell colSpan={8} className="text-center font-medium text-gray-500">
                Loading...
              </TableCell>
            </TableRow>
          ) : income.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center font-medium text-gray-500">
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
                <TableCell>NPR {row.add_income.toLocaleString()}</TableCell>
                <TableCell>{row.income_category}</TableCell>
                <TableCell>NPR {row.total_income.toLocaleString()}</TableCell>
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
