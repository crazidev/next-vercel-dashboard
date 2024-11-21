import { Transactions } from "@/database/models/transactions";

interface GroupedTransaction {
  date: string;
  earning: number;
  spending: number;
}

export const groupTransactionsByDate = (
  transactions: Transactions[]
): GroupedTransaction[] => {
  const result: { [key: string]: { earning: number; spending: number } } = {};

  transactions.forEach((transaction) => {
    // Extract date (ignoring time) from createdAt
    const date = new Date(transaction.createdAt!).toISOString().split("T")[0];

    // Initialize the date group if not exists
    if (!result[date]) {
      result[date] = { earning: 0, spending: 0 };
    }

    // Classify transactions as earning or spending based on the status
    if (transaction.status === "completed") {
      result[date].earning += transaction.amount;
    } else if (transaction.status === "pending") {
      result[date].spending += transaction.amount;
    }
  });

  // Convert the result object to an array of objects
  return Object.keys(result).map((date) => ({
    date,
    earning: result[date].earning,
    spending: result[date].spending,
  }));
};
