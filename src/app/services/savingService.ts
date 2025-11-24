// services/SavingService.ts
import axios from "axios";
import BASE_URL from "@/app/urlConfig/urlConfig";

import { AddSavingPayload, SavingResponse } from "@/app/types/savingType";

// Helper to get token from cookies
const getToken = (): string => {
  const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
  if (!match) throw new Error("No access_token found in cookies. Please login first.");
  return match[2];
};

// Add new income
export const addSavingService = async (
  payload: AddSavingPayload
): Promise<SavingResponse> => {
  try {
    const token = getToken();
    const response = await axios.post<SavingResponse>(
      `${BASE_URL}/api/savings`,
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
    throw new Error(error.response?.data?.message || error.message || "Failed to add savings");
  }
};

// Get all Savings
export const getSavingService = async (): Promise<SavingResponse[]> => {
  try {
    const token = getToken();

    const response = await axios.get(`${BASE_URL}/api/savings`, {
      headers: { "Authorization": `Bearer ${token}` },
    });

    // Extract array
    const savings: SavingResponse[] = response.data.data;
    
     // Sort only if there are items
    if (savings.length > 0) {
      savings.sort((a, b) => a.id - b.id);
    }

    return savings;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch saving"
    );
  }
};



export const updateSavingService = async (
  sn: string,
  payload: Partial<AddSavingPayload>
): Promise<SavingResponse[]> => {
  try {
    const token = getToken();
    const response = await axios.put<SavingResponse[]>(
      `${BASE_URL}/api/savings/update/${sn}`,
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
      error.response?.data?.message || error.message || "Failed to update saving"
    );
  }
};


export const deleteSavingService = async (sn:string): Promise<void> => {
  try {
    const token = getToken();
    await axios.delete(`${BASE_URL}/api/savings/delete/${sn}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Failed to delete saving"
    );
  }
};

