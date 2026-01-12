export interface AddThresholdPayload {
    expense_threshold_amount: number;
    frequency: "Monthly" | "Yearly";
    isEnable: boolean;
}

export interface ThresholdResponse {
    id: number;
    sn: string;
    customerid: string;
    expense_threshold_amount: number;
    frequency: "Monthly" | "Yearly";
    isEnable: boolean;
    create_date: string;
}
