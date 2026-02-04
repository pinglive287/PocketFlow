import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const range = (searchParams.get("range") || "month") as "day" | "month";
  const dateParam = searchParams.get("date"); // yyyy-mm-dd

  // ===============================
  // 1) กำหนดช่วงเวลา + labels
  // ===============================
  let startDate: Date;
  let endDate: Date;
  let labels: string[] = [];

  if (range === "day") {
    const baseDate = dateParam
      ? dayjs(dateParam)
      : dayjs();

    startDate = baseDate.startOf("day").toDate();
    endDate = baseDate.endOf("day").toDate();

    labels = [
      "02:00","04:00","06:00","08:00","10:00","12:00",
      "14:00","16:00","18:00","20:00","22:00","24:00",
    ];
  } else {
    const baseDate = dateParam
      ? dayjs(dateParam)
      : dayjs();

    startDate = baseDate.startOf("year").toDate();
    endDate = baseDate.endOf("year").toDate();

    labels = [
      "ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.",
      "ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.",
    ];
  }

  // ===============================
  // 2) ดึงข้อมูลจาก DB
  // ===============================
  const transactions = await prisma.transaction.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      amount: true,
      type: true,
      createdAt: true,
    },
  });

  // ===============================
  // 3) map ค่าเริ่มต้น
  // ===============================
  const map = new Map<string, { income: number; expense: number }>();
  labels.forEach(label => {
    map.set(label, { income: 0, expense: 0 });
  });

  // ===============================
  // 4) จัดกลุ่มข้อมูล
  // ===============================
  transactions.forEach(t => {
    let key: string | null = null;

    if (range === "day") {
      const hour = dayjs(t.createdAt).hour();

      // step ทุก 2 ชั่วโมง → 2,4,6,...,24
      const slot = Math.ceil(hour / 2) * 2;
      if (slot < 2 || slot > 24) return;

      key = `${slot.toString().padStart(2, "0")}:00`;
    } else {
      const monthIndex = dayjs(t.createdAt).month(); 
      key = labels[monthIndex];
    }

    if (!key || !map.has(key)) return;

    if (t.type === "INCOME") {
      map.get(key)!.income += Number(t.amount);
    } else if (t.type === "EXPENSE") {
      map.get(key)!.expense += Number(t.amount);
    }
  });

  // ===============================
  // 5) ส่งข้อมูลเรียงตาม labels
  // ===============================
  return NextResponse.json(
    labels.map(label => ({
      label,
      income: map.get(label)!.income,
      expense: map.get(label)!.expense,
    }))
  );
}
