import { ArrowLeft, ClipboardList, PlusCircle } from "lucide-react";
import Link from "next/link";
import TransactionList from "@/components/TransactionList";

export default async function NewTransactionPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const params = await searchParams;

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-neutral-400 hover:text-white transition"
                        >
                            <ArrowLeft />
                        </Link>
                        <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
                            <ClipboardList /> รายการ
                        </h1>
                    </div>
                    <Link
                        href="/transactions/new/add"
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white font-medium
                        hover:bg-emerald-500 transition">
                        <PlusCircle size={20} />
                        เพิ่มรายการใหม่
                    </Link>
                </div>

                <TransactionList
                    searchParams={params}
                    basePath="/transactions/new"
                />
            </div>
        </div>
    );
}
