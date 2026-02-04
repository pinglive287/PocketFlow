import SummaryCard from "@/components/SummaryCard";
import OverviewChart from "@/components/OverviewChart";
import { LayoutDashboard, ClipboardList } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const income = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: "INCOME" },
  });

  const expense = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: "EXPENSE" },
  });

  const totalIncome = income._sum.amount?.toNumber() ?? 0;
  const totalExpense = expense._sum.amount?.toNumber() ?? 0;
  const balance = totalIncome - totalExpense;


  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-white flex items-center gap-2">
            <LayoutDashboard /> Dashboard
          </h1>

          <Link
            href="/transactions/new"
            className="flex items-center gap-2 rounded-xl border border-emerald-600 px-4 py-2 text-white font-medium
               hover:bg-emerald-500 transition"
          >
            <ClipboardList size={20} />
            รายการ
          </Link>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="รายรับ" amount={totalIncome} type="income" />
          <SummaryCard title="รายจ่าย" amount={totalExpense} type="expense" />
          <SummaryCard title="คงเหลือ" amount={balance} type="balance" />
        </div>

        <OverviewChart />
      </div>
    </div>
  );
}
