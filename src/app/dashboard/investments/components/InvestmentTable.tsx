"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";


import { getInvestmentService } from "@/app/services/investmentService";
import { InvestmentResponse } from "@/app/types/investmentType";

export default function InvestmentTable() {
  const [investment, setInvestment] = useState<InvestmentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestment = async () => {
      setLoading(true);
      try {
        const data = await getInvestmentService();
        setInvestment(data);
      } catch (error) {
        console.error("Error fetching Investment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestment();
  }, []);

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
                Loading...
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
                <TableCell>NPR {row.add_investment.toLocaleString()}</TableCell>
                <TableCell>{row.investment_category}</TableCell>
                <TableCell>NPR {row.total_investment.toLocaleString()}</TableCell>
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
