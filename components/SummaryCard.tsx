import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

type Props = {
  title: string;
  amount: number;
  type: "income" | "expense" | "balance";
};

const config = {
  income: {
    icon: ArrowUpRight,
    color: "text-emerald-400",
    bg: "from-emerald-500/20 to-emerald-500/5",
  },
  expense: {
    icon: ArrowDownLeft,
    color: "text-rose-400",
    bg: "from-rose-500/20 to-rose-500/5",
  },
  balance: {
    icon: Wallet,
    color: "text-sky-400",
    bg: "from-sky-500/20 to-sky-500/5",
  },
};

export default function SummaryCard({ title, amount, type }: Props) {
  const Icon = config[type].icon;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${config[type].bg} backdrop-blur border border-white/10 p-6`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-300">{title}</p>
        <Icon className={`w-5 h-5 ${config[type].color}`} />
      </div>

      <p className={`mt-2 text-3xl font-bold ${config[type].color}`}>
        {amount.toLocaleString()} ฿
      </p>
    </div>
  );
}
