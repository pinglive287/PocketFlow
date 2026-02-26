import { prisma } from "@/lib/prisma";
import TransactionItem from "./TransactionItem";
import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
    date?: string;
  };
  basePath: string;
}

export default async function TransactionList({ searchParams, basePath }: Props) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const dateParam = searchParams.date as string | undefined;

  // 👇 สร้าง where condition แบบ dynamic
  let where: any = {};

  if (dateParam) {
    const start = new Date(dateParam);
    const end = new Date(dateParam);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    where.transactionDate = {
      gte: start,
      lte: end,
    };
  }

  const totalCount = await prisma.transaction.count({ where });

  const transactions = await prisma.transaction.findMany({
    where,
    orderBy: [
      { transactionDate: "desc" }, 
      { id: "desc" },
    ],
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
      {/* 🔎 Search by date */}
      <form method="GET" className="flex gap-2">
        <input
          type="date"
          name="date"
          defaultValue={dateParam}
          className="px-5 py-2 bg-neutral-800 rounded-xl"
        />
        <button className="px-4 py-2 bg-sky-600 rounded-xl">
          ค้นหา
        </button>
      </form>

      <div className="space-y-3">
        {safeTransactions.map((item) => (
          <TransactionItem key={item.id} transaction={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 justify-center mt-4">
        {page > 1 && (
          <Link
            href={`${basePath}?page=${page - 1}${dateParam ? `&date=${dateParam}` : ""}`}
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
            href={`${basePath}?page=${page + 1}${dateParam ? `&date=${dateParam}` : ""}`}
            className="px-4 py-2 bg-neutral-800 rounded-xl"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}