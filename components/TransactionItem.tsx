"use client";

import { useState } from "react";
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
    createdAt: string;
  };
};

export default function TransactionItem({ transaction }: Props) {
  const isExpense = transaction.type === "EXPENSE";
  const [showActions, setShowActions] = useState(false);

  const date = new Date(transaction.transactionDate);
  const time = new Date(transaction.createdAt);

  const formattedDate = date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  });

  const formattedTime = new Date(time).toLocaleTimeString("th-TH", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div
      onClick={() => setShowActions((prev) => !prev)}
      className="
        flex items-center justify-between
        rounded-2xl bg-neutral-800/70
        border border-white/5
        px-5 py-4
        cursor-pointer
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
            {formattedDate} เวลา {formattedTime} น.
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
          className={`text font-semibold ${isExpense ? "text-rose-400" : "text-emerald-400"
            }`}
        >
          {isExpense ? "-" : "+"} {transaction.amount.toLocaleString()} ฿
        </p>

        {/* Actions */}
        <div
          className={`
            items-center gap-2
            transition-all duration-200
            ${showActions ? "flex opacity-100" : "hidden opacity-0 pointer-events-none"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
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
