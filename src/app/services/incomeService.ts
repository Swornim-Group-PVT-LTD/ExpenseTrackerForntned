// services/incomeService.ts
import axios from "axios";
import BASE_URL from "@/app/urlConfig/urlConfig";
import { AddIncomePayload, IncomeResponse } from "../types/incomeType";

// ----------------------------
// Get Token From Cookies
// ----------------------------
const getToken = (): string => {
  // Handles: access_token=xxxx OR access_token="xxxx"
  const match = document.cookie.match(/access_token="?([^";]+)"?/);
  if (!match) throw new Error("No access_token found in cookies. Please login first.");
  return match[1];
};

// ----------------------------
// Add New Income
// ----------------------------
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
    throw new Error(
      error.response?.data?.message || error.message || "Failed to add incomes"
    );
  }
};

// ----------------------------
// Get All Incomes
// ----------------------------
export const getIncomeService = async (): Promise<IncomeResponse[]> => {
  try {
    const token = getToken();

    const response = await axios.get(`${BASE_URL}/api/incomes`, {
      headers: { "Authorization": `Bearer ${token}` },
      withCredentials: true,
    });

    // If backend returns:
    // { "data": [ ... ] }
    // OR [ ... ]
    return response.data.data ?? response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch income"
    );
  }
};
