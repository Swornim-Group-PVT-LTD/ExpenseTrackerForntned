// services/balanceService.ts
import axios from "axios";
import BASE_URL from "@/app/urlConfig/urlConfig";
import { AddBalancePayload, BalanceResponse } from "../types/balanceType";

// Helper to get token from cookies
const getToken = (): string => {
  const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
  if (!match) throw new Error("No access_token found in cookies. Please login first.");
  return match[2];
};

// Add new balance
export const addBalanceService = async (
  payload: AddBalancePayload
): Promise<BalanceResponse> => {
  try {
    const token = getToken();
    const response = await axios.post<BalanceResponse>(
      `${BASE_URL}/api/balances`,
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
    throw new Error(error.response?.data?.message || error.message || "Failed to add balance");
  }
};

// Get all balances
export const getBalancesService = async (): Promise<BalanceResponse[]> => {
    debugger;
  try {
    const token = getToken();
    const response = await axios.get<BalanceResponse[]>(`${BASE_URL}/api/balances`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to fetch balances");
  }
};
