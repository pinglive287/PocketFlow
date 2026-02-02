"use client";

import DeleteTransactionButton from "./DeleteTransactionButton";
import { SquarePen } from "lucide-react";
import Link from "next/link";

type Props = {
  transaction: {
    id: number;
    title: string | null;
    amount: number;
    type: "INCOME" | "EXPENSE";
    note: string | null;
    transactionDate: string;
  };
};

export default function TransactionItem({ transaction }: Props) {
  const isExpense = transaction.type === "EXPENSE";

  return (
    <div
      className="
        group flex items-center justify-between
        rounded-2xl bg-neutral-800/70
        border border-white/5
        px-5 py-4
        hover:bg-neutral-800
        hover:border-white/10
        transition-all
      "
    >
      {/* Left */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <p className="text-white font-medium">
            {transaction.title ?? "ไม่ระบุรายการ"}
          </p>

          <span
            className="
              rounded-full bg-neutral-700/60
              px-2 py-0.5 text-[11px]
              text-neutral-300
            "
          >
            {new Date(transaction.transactionDate).toLocaleDateString("th-TH")}
          </span>
        </div>

        {transaction.note && (
          <p className="text-xs text-neutral-400">
            {transaction.note}
          </p>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <p
          className={`text-sm font-semibold ${
            isExpense ? "text-rose-400" : "text-emerald-400"
          }`}
        >
          {isExpense ? "-" : "+"} {transaction.amount.toLocaleString()} ฿
        </p>

        {/* Show delete on hover */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
          {/* Edit */}
          <Link
            href={`/transactions/new/${transaction.id}/edit`}
            className="text-yellow-400"
            title="แก้ไขรายการ"
          >
            <SquarePen />
          </Link>

          {/* Delete */}
          <DeleteTransactionButton id={transaction.id} />
        </div>
      </div>
    </div>
  );
}
