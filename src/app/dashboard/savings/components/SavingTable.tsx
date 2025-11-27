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
  getSavingService,
  deleteSavingService,
  updateSavingService,
} from "@/app/services/savingService";
import { SavingResponse } from "@/app/types/savingType";
import { SavingCategoryResponse } from "@/app/types/catalolgueType/savingCatalogueType";
import { getSavingCategoriesService } from "@/app/services/catalogueServices/savingCatalogueService";
import { on } from "events";

export default function SavingTable({
  refreshTrigger,
  filteredData,
  onSuccess,
}: {
  refreshTrigger: number;
  filteredData?: SavingResponse[] | null;
  onSuccess?: () => void;
}) {
  const [saving, setSaving] = useState<SavingResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingSn, setEditingSn] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    add_saving: 0,
    saving_category: "",
    want_to_deduct_from_balance: false,
  });

  const [categories, setCategories] = useState<SavingCategoryResponse[]>([]);

  const fetchCategories = async () => {
    try {
      const data = await getSavingCategoriesService();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch saving categories:", err);
      toast.error("Failed to fetch saving categories");
    }
  };

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

  useEffect(() => {
    if (filteredData) {
      setSaving(filteredData);
      setLoading(false);
    } else {
      fetchSaving();
    }
    fetchCategories();
  }, [refreshTrigger, filteredData]);

  // Start editing a row
  const startEdit = (item: any) => {
    setEditingSn(item.sn);
    setEditForm({
      add_saving: item.add_saving,
      saving_category: item.saving_category,
      want_to_deduct_from_balance: item.want_to_deduct_from_balance,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingSn(null);
    setEditForm({
      add_saving: 0,
      saving_category: "",
      want_to_deduct_from_balance: false,
    });
  };

  // Save update
  const saveEdit = async (sn: string) => {
    try {
      await updateSavingService(sn, {
        add_saving: editForm.add_saving,
        saving_category: editForm.saving_category,
        want_to_deduct_from_balance: editForm.want_to_deduct_from_balance,
      });

      onSuccess && onSuccess();
      toast.success("Saving updated successfully");
      setSaving((prev) =>
        prev.map((item) =>
          item.sn === sn
            ? {
                ...item,
                add_saving: editForm.add_saving,
                saving_category: editForm.saving_category,
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
    if (!confirm("Are you sure you want to delete this saving?")) return;
    try {
      deleteSavingService(sn);
      onSuccess && onSuccess();
      toast.success("saving deleted successfully");
      setSaving(saving.filter((saving) => saving.sn !== sn));
    } catch (error) {
      console.error("Error deleting saving:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table striped>
        <TableHead className="text-lg">
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Saving</TableHeadCell>
            {editingSn && <TableHeadCell>Deduct from balance</TableHeadCell>}
            <TableHeadCell>Remarks</TableHeadCell>
            <TableHeadCell>Total Saving</TableHeadCell>
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
          ) : saving.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center font-medium text-gray-500"
              >
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
                <TableCell>
                  NPR{" "}
                  {editingSn === row.sn ? (
                    <input
                      className="border p-1"
                      value={editForm.add_saving}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          add_saving: Number(e.target.value),
                        }))
                      }
                    />
                  ) : (
                    row.add_saving
                  )}
                </TableCell>

                {editingSn && editingSn === row.sn && (
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={editForm.want_to_deduct_from_balance}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          want_to_deduct_from_balance: e.target.checked,
                        }))
                      }
                    />
                  </TableCell>
                )}

                <TableCell>
                  {editingSn === row.sn ? (
                    <select
                      className="border p-1 rounded"
                      value={editForm.saving_category}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          saving_category: e.target.value,
                        }))
                      }
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.saving_category}>
                          {cat.saving_category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    row.saving_category
                  )}
                </TableCell>
                <TableCell>NPR {row.total_saving.toLocaleString()}</TableCell>
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
