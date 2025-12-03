import React from "react";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { getBalancesService } from "@/app/services/balanceService";
import { BalanceResponse } from "@/app/types/balanceType";
import StatCard from "@/app/components/statcard";

interface BalanceCardProps {
  refreshTrigger: number;
}

const BalanceCard = ({ refreshTrigger }: BalanceCardProps) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [currency,setCurrency]=useState("NPR");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        const balances: BalanceResponse[] = await getBalancesService();

        if (balances.length > 0) {
          const latestBalance = Number(
            balances[balances.length - 1].total_balance || 0
          );
          setCurrency(balances[balances.length - 1].currency?.symbol || "NPR");
          setBalance(latestBalance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [refreshTrigger]);

  return (
    <div>
      <div className="lg:col-span-1">
        <StatCard
          icon="/balance-logo.svg"
          label="Balance"
          value={
            loading ? (
              <ClipLoader size={22} color="#000000" />
            ) : (
              `${currency} ${balance?.toLocaleString() ?? 0}`
            )
          }
          percentage="100%"
          labelColor="#000000"
        />
      </div>
    </div>
  );
};

export default BalanceCard;
