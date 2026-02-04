// components/TransactionList.tsx (Server)
import { prisma } from "@/lib/prisma";
import TransactionItem from "./TransactionItem";

export default async function TransactionList() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { id: "desc" },
    take: 10,
  });

  const safeTransactions = transactions.map((t) => ({
    id: t.id,
    title: t.title,
    amount: t.amount.toNumber(),          
    type: t.type,                     
    note: t.note,                     
    transactionDate: t.transactionDate.toISOString(),
    createdAt: t.createdAt.toISOString(),
  }));


  return (
    <div className="space-y-3">
      {safeTransactions.map((item) => (
        <TransactionItem key={item.id} transaction={item} />
      ))}
    </div>
  );
}
