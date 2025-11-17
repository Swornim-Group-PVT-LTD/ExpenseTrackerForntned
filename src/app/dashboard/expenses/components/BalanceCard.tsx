import React from 'react'

import { useEffect, useState } from "react";

import { getBalancesService } from "@/app/services/addBalanceService"; 
import { BalanceResponse } from "@/app/types/balanceType";

import StatCard from '@/app/dashboard/components/statcard';

const BalanceCard = () => {
        const [balance, setBalance] = useState<number | null>(null);
          const [loading, setLoading] = useState(true);
        
          useEffect(() => {
            const fetchBalance = async () => {
              try {
                const balances: BalanceResponse[] = await getBalancesService();
                if (balances.length > 0) {
                  const latestBalance = balances[balances.length - 1].total_balance;
                  setBalance(latestBalance);
                }
              } catch (error) {
                console.error("Error fetching balance:", error);
              } finally {
                setLoading(false);
              }
            };
        
            fetchBalance();
          }, []);
  return (
    <div>
      <div className="lg:col-span-1">
                  <StatCard
                    icon="/balance-logo.svg"
                    label="Balance"
                    value={loading ? "Loading..." : `NPR ${balance?.toLocaleString() ?? 0}`}
                    percentage="100%"
                    labelColor="#000000"
                  />
                </div>
    </div>
  )
}

export default BalanceCard
