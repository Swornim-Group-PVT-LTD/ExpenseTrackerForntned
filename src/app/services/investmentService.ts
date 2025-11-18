// services/InvestmentService.ts
import axios from "axios";
import BASE_URL from "@/app/urlConfig/urlConfig";
import { AddInvestmentPayload, InvestmentResponse } from "../types/investmentType";

// Helper to get token from cookies
const getToken = (): string => {
  const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
  if (!match) throw new Error("No access_token found in cookies. Please login first.");
  return match[2];
};

// Add new Investment
export const addInvestmentService = async (
  payload: AddInvestmentPayload
): Promise<InvestmentResponse> => {
  try {
    const token = getToken();
    const response = await axios.post<InvestmentResponse>(
      `${BASE_URL}/api/investments`,
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
    throw new Error(error.response?.data?.message || error.message || "Failed to add Investments");
  }
};

// Get all Investments
export const getInvestmentService = async (): Promise<InvestmentResponse[]> => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/api/investments`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    // response.data is the full API object; the array is in data
    return response.data.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to fetch Investment");
  }
};
