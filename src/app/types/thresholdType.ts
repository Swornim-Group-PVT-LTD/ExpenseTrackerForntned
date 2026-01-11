export interface AddThresholdPayload {
    expense_threshold_amount: number;
    frequency: "Monthly" | "Yearly";
    isEnabled: boolean;
}

export interface ThresholdResponse {
    id: number;
    sn: string;
    customerid: string;
    expense_threshold_amount: number;
    frequency: "Monthly" | "Yearly";
    isEnabled: boolean;
    created_date: string;
}
