// services/incomeService.ts
import axios from "axios";
import BASE_URL from "@/app/urlConfig/urlConfig";
import { AddIncomePayload, IncomeResponse } from "../types/incomeType";

// Helper to get token from cookies
const getToken = (): string => {
  const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
  if (!match) throw new Error("No access_token found in cookies. Please login first.");
  return match[2];
};

// Add new income
export const addIncomeService = async (
  payload: AddIncomePayload
): Promise<IncomeResponse> => {
  try {
    const token = getToken();
    const response = await axios.post<IncomeResponse>(
      `${BASE_URL}/api/incomes`,
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
    throw new Error(error.response?.data?.message || error.message || "Failed to add incomes");
  }
};

// Get all incomes
export const getIncomeService = async (): Promise<IncomeResponse[]> => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/api/incomes`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    // response.data is the full API object; the array is in data
    return response.data.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to fetch income");
  }
};
