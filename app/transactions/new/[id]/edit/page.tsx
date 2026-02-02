import { prisma } from "@/lib/prisma";
import { updateTransaction } from "@/app/transactions/new/actions";
import { notFound } from "next/navigation";
import { Pen, ArrowLeft } from 'lucide-react';
import Link from "next/link";

type Props = {
    params: {
        id: string;
    };
};

export default async function EditTransactionPage({ params }: Props) {

    const { id } = await params;
    const transactionId = Number(id);

    const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
    });

    if (!transaction) return notFound();

    return (
        <div className="max-w-xl mx-auto mt-10">
            <div className="flex items-center gap-4 mb-5">
                <Link
                    href="/"
                    className="text-neutral-400 hover:text-white transition"
                >
                    <ArrowLeft />
                </Link>

                <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
                    <Pen /> แก้ไขรายการ
                </h1>
            </div>
            <form
                action={updateTransaction}
                className="space-y-4 rounded-2xl bg-neutral-800 p-6"
            >
                {/* hidden id */}
                <input type="hidden" name="id" value={transaction.id} />

                {/* Type */}
                <div>
                    <label className="text-sm text-neutral-400">ประเภท</label>
                    <select
                        name="type"
                        defaultValue={transaction.type}
                        className="w-full rounded-lg bg-neutral-900 px-3 py-2 text-white"
                    >
                        <option value="INCOME">รายรับ</option>
                        <option value="EXPENSE">รายจ่าย</option>
                    </select>
                </div>

                {/* Title */}
                <div>
                    <label className="text-sm text-neutral-400">ชื่อรายการ</label>
                    <input
                        name="title"
                        defaultValue={transaction.title ?? ""}
                        className="w-full rounded-lg bg-neutral-900 px-3 py-2 text-white"
                    />
                </div>

                {/* Amount */}
                <div>
                    <label className="text-sm text-neutral-400">จำนวนเงิน</label>
                    <input
                        type="number"
                        name="amount"
                        defaultValue={transaction.amount.toNumber()}
                        className="w-full rounded-lg bg-neutral-900 px-3 py-2 text-white"
                        required
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="text-sm text-neutral-400">วันที่</label>
                    <input
                        type="date"
                        name="transactionDate"
                        defaultValue={transaction.transactionDate
                            .toISOString()
                            .split("T")[0]}
                        className="w-full rounded-lg bg-neutral-900 px-3 py-2 text-white"
                    />
                </div>

                {/* Note */}
                <div>
                    <label className="text-sm text-neutral-400">หมายเหตุ</label>
                    <textarea
                        name="note"
                        defaultValue={transaction.note ?? ""}
                        className="w-full rounded-lg bg-neutral-900 px-3 py-2 text-white"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="submit"
                        className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
                    >
                        บันทึกการแก้ไข
                    </button>
                </div>
            </form>
        </div>
    );
}
