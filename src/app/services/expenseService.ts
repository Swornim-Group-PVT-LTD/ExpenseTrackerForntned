// services/expenseService.ts
import axios from "axios";
import BASE_URL from "@/app/urlConfig/urlConfig";
import { AddExpensePayload, ExpenseResponse } from "../types/expenseType";

// Helper to get token from cookies
const getToken = (): string => {
  const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
  if (!match) throw new Error("No access_token found in cookies. Please login first.");
  return match[2];
};

// Add new Expense
export const addExpenseService = async (
  payload: AddExpensePayload
): Promise<ExpenseResponse> => {
  try {
    const token = getToken();
    const response = await axios.post<ExpenseResponse>(
      `${BASE_URL}/api/expenses`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to add expenses");
  }
};

// Get all Expenses
export const getExpenseService = async (): Promise<ExpenseResponse[]> => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/api/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Safely extract array from response
    const expenses: ExpenseResponse[] = response.data?.data || [];

    // Sort by id ascending if array is not empty
    if (expenses.length > 0) {
      expenses.sort((a, b) => a.id - b.id);
    }

    return expenses;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch expenses"
    );
  }
};

