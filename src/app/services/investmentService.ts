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

    // Extract array
    const investments: InvestmentResponse[] = response.data.data;

    // Sort by id ascending
     // Sort only if there are items
    if (investments.length > 0) {
      investments.sort((a, b) => a.id - b.id);
    }

    return investments;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch Investment"
    );
  }
};


export const deleteInvestmentService = async (sn:string): Promise<void> => {
  try {
    const token = getToken();
    await axios.delete(`${BASE_URL}/api/investments/delete/${sn}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to delete Investment"
    );
  }
};


export const updateInvestmentService = async (
  sn: string,
  payload: Partial<AddInvestmentPayload>
): Promise<InvestmentResponse> => {
  try {
    const token = getToken();
    const response = await axios.put<InvestmentResponse>(
      `${BASE_URL}/api/investments/update/${sn}`,
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
      error.response?.data?.message || error.message || "Failed to update Investment"
    );
  }
};


//get investments by date range
export const getInvestmentByDateRangeService = async (from?: string, to?: string, category?: string): Promise<InvestmentResponse[]> => {
  try {
    const token = getToken();

    const params: any = {};
    if (from && to) {
      params.start_date = from;
      params.end_date = to;
    }
    if (category) {
      params.investment_category = category;
    }

    const response = await axios.get(`${BASE_URL}/api/investments`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response.data.data || [];
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch expenses by date range"
    );
  }
};