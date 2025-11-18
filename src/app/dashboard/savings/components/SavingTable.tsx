"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";


import { getSavingService } from "@/app/services/savingService";
import { SavingResponse } from "@/app/types/savingType";

export default function SavingTable() {
  const [saving, setSaving] = useState<SavingResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaving = async () => {
      setLoading(true);
      try {
        const data = await getSavingService();
        setSaving(data);
      } catch (error) {
        console.error("Error fetching Saving:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaving();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead className="text-lg">
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Saving</TableHeadCell>
            <TableHeadCell>Remarks</TableHeadCell>
            <TableHeadCell>Total Saving</TableHeadCell>
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
          ) : saving.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center font-medium text-gray-500">
                No Saving found
              </TableCell>
            </TableRow>
          ) : (
            saving.map((row) => (
              <TableRow
                key={row.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {row.id}
                </TableCell>
                <TableCell>NPR {row.add_saving.toLocaleString()}</TableCell>
                <TableCell>{row.saving_category}</TableCell>
                <TableCell>NPR {row.total_saving.toLocaleString()}</TableCell>
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
