export interface AddBalancePayload {
  add_opening_balance: number;
}

export interface BalanceResponse {
  id: number;
  sn: string;
  customerid: string;
  add_opening_balance: number;
  closing_balance: number;
  total_balance: number;
  created_date: string; // or Date
  updated_date: string; // or Date
}
