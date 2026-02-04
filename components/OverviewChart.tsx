"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ranges = [
  { key: "day", label: "รายวัน" },
  { key: "month", label: "รายเดือน" },
] as const;

export default function OverviewChart() {
  const [range, setRange] = useState<"day" | "month">("day");
  const [data, setData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const dayLabels = [
    "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", 
    "14:00", "16:00", "18:00", "20:00", "22:00", "24:00",
  ];

  const monthLabels = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
  ];

   function normalizeData(range: "day" | "month", raw: any[]) {
    const labels = range === "day" ? dayLabels : monthLabels;

    return labels.map(label => {
      const found = raw.find(d => d.label === label);
      return {
        label,
        income: found?.income ?? 0,
        expense: found?.expense ?? 0,
      };
    });
  }

  useEffect(() => {
    const params = new URLSearchParams({
      range,
      date: selectedDate,
    });

    fetch(`/api/transactions?${params.toString()}`)
      .then(res => res.json())
      .then(raw => {
        setData(normalizeData(range, raw));
      });
  }, [range, selectedDate]);

  return (
    <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-white text-xl font-semibold">
            ภาพรวมรายรับรายจ่าย
          </h2>
          <p className="text-neutral-400 text-sm">
            เลือกช่วงเวลาและวันที่
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date picker */}
          {range === "day" && (
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-sm text-white"
            />
          )}

          {/* Range switch */}
          <div className="flex rounded-xl bg-neutral-800 p-1">
            {ranges.map(r => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={`px-4 py-1.5 text-sm rounded-lg transition
                  ${range === r.key
                    ? "bg-emerald-500 text-black font-medium"
                    : "text-neutral-300 hover:text-white"
                  }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis dataKey="label" stroke="#737373" />
          <YAxis stroke="#737373" />
          <Tooltip />
          <Bar dataKey="income" fill="#22c55e" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}