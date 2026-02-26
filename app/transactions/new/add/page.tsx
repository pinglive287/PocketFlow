"use client";

import { useEffect, useState } from "react";
import { createTransaction } from "../actions";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

const todayLocal = () => dayjs().format("YYYY-MM-DD");

export default function NewTransactionPage() {
    const [date, setDate] = useState(todayLocal());

    useEffect(() => {
        const updateDate = () => {
            setDate(todayLocal());
        };

        updateDate();
        window.addEventListener("focus", updateDate);

        return () => {
            window.removeEventListener("focus", updateDate);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 p-8">
            <div className="max-w-xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/transactions/new"
                        className="text-neutral-400 hover:text-white transition"
                    >
                        <ArrowLeft />
                    </Link>
                    <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <PlusCircle /> เพิ่มรายการใหม่
                    </h1>
                </div>

                {/* Form */}
                <form action={createTransaction} className="space-y-5 bg-neutral-900 p-6 rounded-2xl">
                    {/* ประเภทรายการ */}
                    <div>
                        <label className="block text-sm text-neutral-300 mb-1">
                            ประเภท
                        </label>
                        <select name="type" className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option value="INCOME">รายรับ</option>
                            <option value="EXPENSE">รายจ่าย</option>
                        </select>
                    </div>

                    {/* ชื่อรายการ */}
                    <div>
                        <label className="block text-sm text-neutral-300 mb-1">
                            ชื่อรายการ
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="เช่น เงินเดือน, ค่าอาหาร"
                            className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    {/* จำนวนเงิน */}
                    <div>
                        <label className="block text-sm text-neutral-300 mb-1">
                            จำนวนเงิน
                        </label>
                        <input
                            name="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    {/* วันที่ */}
                    <div>
                        <label className="block text-sm text-neutral-300 mb-1">
                            วันที่
                        </label>
                        <input
                            name="transactionDate"
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    {/* หมายเหตุ */}
                    <div>
                        <label className="block text-sm text-neutral-300 mb-1">
                            หมายเหตุ
                        </label>
                        <textarea
                            name="note"
                            rows={3}
                            placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
                            className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 rounded-xl bg-emerald-600 py-2 text-white font-medium hover:bg-emerald-500 transition cursor-pointer"
                        >
                            บันทึกรายการ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
