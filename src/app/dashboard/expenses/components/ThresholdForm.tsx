"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { addThresholdService } from "@/app/services/thresholdService";
import { AddThresholdPayload } from "@/app/types/thresholdType";

interface ThresholdFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const ThresholdForm = ({ isOpen, onClose, onSuccess }: ThresholdFormProps) => {
    const [amount, setAmount] = useState<number | "">("");
    const [frequency, setFrequency] = useState<"Monthly" | "Yearly">("Monthly");
    const [isEnabled, setIsEnabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        // Validation
        if (!amount || amount <= 0) {
            toast.error("Please enter a valid threshold amount");
            return;
        }

        try {
            setLoading(true);

            const payload: AddThresholdPayload = {
                expense_threshold_amount: Number(amount),
                frequency: frequency,
                isEnable: isEnabled,
            };

            await addThresholdService(payload);

            toast.success(`Threshold of ${amount} added successfully.`);

            // Reset form
            setAmount("");
            setFrequency("Monthly");
            setIsEnabled(true);

            onSuccess && onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error.message || "Failed to add threshold");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setAmount("");
        setFrequency("Monthly");
        setIsEnabled(true);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Add Expense Threshold</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
                        {/* Threshold Amount */}
                        <div className="flex-1 min-w-0">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 whitespace-nowrap">
                                Expense Threshold Amount
                            </label>
                            <input
                                type="number"
                                inputMode="decimal"
                                placeholder="0"
                                className="w-full h-12 px-3 text-md font-bold text-[#716A6A] 
                       border border-[#574A4A]/50 rounded outline-none 
                       focus:border-[#FFA726]
                       [appearance:textfield] 
                       [&::-webkit-outer-spin-button]:appearance-none 
                       [&::-webkit-inner-spin-button]:appearance-none"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(e.target.value === "" ? "" : Number(e.target.value))
                                }
                            />
                        </div>

                        {/* Frequency */}
                        <div className="flex-1 min-w-0">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 whitespace-nowrap">
                                Frequency
                            </label>
                            <select
                                className="w-full h-12 px-3 text-md font-bold text-[#716A6A] 
                       border border-[#574A4A]/50 rounded outline-none 
                       focus:border-[#FFA726] bg-white"
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value as "Monthly" | "Yearly")}
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>

                        {/* Enable/Disable Switch */}
                        <div className="flex-1 min-w-0">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 whitespace-nowrap">
                                Enable Threshold
                            </label>
                            <div className="flex items-center h-12">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isEnabled}
                                        onChange={(e) => setIsEnabled(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFA726]/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFAA00]"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        {isEnabled ? "Enabled" : "Disabled"}
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Add Button */}
                        <div className="shrink-0 w-full lg:w-auto">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 invisible whitespace-nowrap">
                                Action
                            </label>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className={`bg-[#FFAA00] hover:bg-[#FFAA00]/90 text-white font-bold 
                        text-md px-8 h-12 w-full lg:w-auto rounded transition-colors 
                        cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {loading ? "Adding..." : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThresholdForm;
