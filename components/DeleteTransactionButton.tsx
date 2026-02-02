"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteTransaction } from "@/app/transactions/new/actions";

type Props = {
  id: number;
};

export default function DeleteTransactionButton({ id }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ปุ่มลบ */}
      <button
        onClick={() => setOpen(true)}
        className="text-neutral-400 hover:text-rose-400"
        title="ลบรายการ"
      >
        <Trash2 className="text-red-400 cursor-pointer" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Card */}
          <div className="relative z-10 w-full max-w-sm rounded-2xl bg-neutral-900 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-rose-400" />
              <h3 className="text-lg font-semibold text-white">
                ยืนยันการลบ
              </h3>
            </div>

            <p className="text-sm text-neutral-400 mb-6">
              คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้  
              <br />
              <span className="text-rose-400">การลบไม่สามารถกู้คืนได้</span>
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-neutral-800 py-2 text-neutral-300 hover:bg-neutral-700 transition"
              >
                ยกเลิก
              </button>

              <form
                action={async (formData) => {
                  await deleteTransaction(formData);
                  setOpen(false);
                }}
                className="flex-1"
              >
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-rose-600 py-2 text-white font-medium hover:bg-rose-500 transition"
                >
                  ลบรายการ
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}