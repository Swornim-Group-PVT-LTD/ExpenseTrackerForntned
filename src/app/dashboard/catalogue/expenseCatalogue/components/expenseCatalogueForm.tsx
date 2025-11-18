"use client";

import { useState } from "react";

export default function ExpenseCatalogueForm() {
  const [catalogue, setCatalogue] = useState("Expense");
  const [category, setCategory] = useState("");
  const [additional1, setAdditional1] = useState("");
  const [additional2, setAdditional2] = useState("");
  const [additional3, setAdditional3] = useState("");
  const [additional4, setAdditional4] = useState("");

  const handleAdd = () => {
    const payload = {
      catalogue,
      category,
      additional1,
      additional2,
      additional3,
      additional4,
    };
    console.log("Added:", payload);
    // Call your API here
  };

  return (
    <div className="p-6 bg-gray-50 rounded-md max-w-4xl mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end text-left">
        <div>
          <label className="block mb-1 text-gray-700">Catalogue</label>
          <input
            type="text"
            value={catalogue}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Expense Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Food"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Additional Value 1</label>
          <input
            type="text"
            value={additional1}
            onChange={(e) => setAdditional1(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Additional Value 2</label>
          <input
            type="text"
            value={additional2}
            onChange={(e) => setAdditional2(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Additional Value 3</label>
          <input
            type="text"
            value={additional3}
            onChange={(e) => setAdditional3(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Additional Value 4</label>
          <input
            type="text"
            value={additional4}
            onChange={(e) => setAdditional4(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="md:col-span-3 flex justify-start">
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-yellow-300 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
