// components/savingCatalogueForm.tsx
"use client";

import { useState } from "react";
import { addSavingCategoryService } from "../../../../services/catalogueServices/savingCatalogueService";
import { AddSavingCategoryPayload } from "../../../../types/catalolgueType/savingCatalogueType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SavingCatalogueFormProps {
  onSuccess?: () => void;
}

export default function SavingCatalogueForm({ onSuccess }: SavingCatalogueFormProps) {
  const [category, setCategory] = useState("");
  const [additional1, setAdditional1] = useState("");
  const [additional2, setAdditional2] = useState("");
  const [additional3, setAdditional3] = useState("");
  const [additional4, setAdditional4] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!category.trim()) newErrors.category = "Please input category";

    [additional1, additional2, additional3, additional4].forEach((val, idx) => {
      if (val && isNaN(Number(val))) newErrors[`additional${idx+1}`] = "Please input number";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const payload: AddSavingCategoryPayload = {
        static_value: "SAVING",
        saving_category: category,
        additional_value1: additional1 || null,
        additional_value2: additional2 || null,
        additional_value3: additional3 || null,
        additional_value4: additional4 || null,
      };

      await addSavingCategoryService(payload);
      onSuccess && onSuccess();
      toast.success("Saving category added successfully!");

      setCategory(""); setAdditional1(""); setAdditional2(""); setAdditional3(""); setAdditional4(""); setErrors({});
    } catch (err: any) {
      setErrors({ form: err.message || "Failed to add saving category" });
      toast.error(err.message || "Failed to add saving category");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-3 py-2 border rounded-md ${errors[field] ? "border-red-500" : "border-gray-300"}`;

  return (
    <div className="p-6 bg-gray-50 rounded-md max-w-full mt-6 overflow-x-auto">
      {errors.form && <p className="text-red-500 mb-2 font-medium">{errors.form}</p>}
      <div className="flex gap-4 items-end">
        {/* Catalogue */}
        <div className="flex-1 min-w-[150px]">
          <label className="block mb-1 text-gray-700">Catalogue</label>
          <input type="text" value="SAVING" readOnly className="w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed" />
        </div>

        {/* Saving Category */}
        <div className="flex-1 min-w-[150px]">
          <label className="block mb-1 text-gray-700">Saving Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Retirement" className={inputClass("category")} />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Additional Values */}
        {[additional1, additional2, additional3, additional4].map((val, idx) => (
          <div className="flex-1 min-w-[120px]" key={idx}>
            <label className="block mb-1 text-gray-700">Additional {idx+1}</label>
            <input type="text" value={val} onChange={(e) => {
              const setters = [setAdditional1, setAdditional2, setAdditional3, setAdditional4];
              setters[idx](e.target.value);
            }} className={inputClass(`additional${idx+1}`)} />
            {errors[`additional${idx+1}`] && <p className="text-red-500 text-sm mt-1">{errors[`additional${idx+1}`]}</p>}
          </div>
        ))}

        {/* Submit Button */}
        <div className="flex-none">
          <button onClick={handleAdd} disabled={loading} className={`px-6 py-2 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
