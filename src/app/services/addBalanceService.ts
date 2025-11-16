import axios from "axios";
import BASE_URL from "@/app/urlConfig/urlConfig";
import { AddBalancePayload, AddBalanceResponse } from "../types/balanceType";

export const addBalanceService = async (
  payload: AddBalancePayload
): Promise<AddBalanceResponse> => {
  try {
    const response = await axios.post<AddBalanceResponse>(
      `${BASE_URL}/api/balances`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to add balance");
  }
};
