import { prisma } from "@/lib/prisma";
import TransactionItem from "./TransactionItem";
import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
  };
  basePath: string;
}

export default async function TransactionList({ searchParams, basePath }: Props) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;

  const totalCount = await prisma.transaction.count();

  const transactions = await prisma.transaction.findMany({
    orderBy: { id: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const totalPages = Math.ceil(totalCount / limit);

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
    <div className="space-y-4">
      <div className="space-y-3">
        {safeTransactions.map((item) => (
          <TransactionItem key={item.id} transaction={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 justify-center mt-4">
        {page > 1 && (
          <Link
            href={`${basePath}?page=${page - 1}`}
            className="px-4 py-2 bg-neutral-800 rounded-xl"
          >
            Previous
          </Link>
        )}

        <span className="px-4 py-2 text-white">
          Page {page} of {totalPages}
        </span>

        {page < totalPages && (
          <Link
            href={`${basePath}?page=${page + 1}`}
            className="px-4 py-2 bg-neutral-800 rounded-xl"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}