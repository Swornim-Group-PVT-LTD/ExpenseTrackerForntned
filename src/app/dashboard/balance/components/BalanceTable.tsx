"use client";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { getBalancesService } from "../../../services/balanceService";
import { BalanceResponse } from "../../../types/balanceType";

export default function BalanceTable({ refreshTrigger }: { refreshTrigger?: number }) {
  const [balances, setBalances] = useState<BalanceResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalances = async () => {
      setLoading(true);
      try {
        const data = await getBalancesService(); // returns BalanceResponse[]
        setBalances(data);
      } catch (error) {
        console.error("Error fetching balances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [refreshTrigger]);

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead className="text-lg">
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Balance</TableHeadCell>
            <TableHeadCell>Opening Balance</TableHeadCell>
            <TableHeadCell>Closing Balance</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
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
          ) : balances.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center font-medium text-gray-500">
                No balances found
              </TableCell>
            </TableRow>
          ) : (
            balances.map((row) => (
              <TableRow
                key={row.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {row.sn}
                </TableCell>
                <TableCell>{row.currency?.symbol} {row.total_balance?.toLocaleString()}</TableCell>
                <TableCell>{row.currency?.symbol} {row.add_opening_balance?.toLocaleString()}</TableCell>
                <TableCell>{row.currency?.symbol} {row.closing_balance?.toLocaleString()}</TableCell>
                <TableCell>{row.created_date}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
