"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // 👈 เพิ่มบรรทัดนี้

export async function createTransaction(formData: FormData) {
  const title = formData.get("title") as string;
  const amount = Number(formData.get("amount"));
  const type = formData.get("type") as "INCOME" | "EXPENSE";
  const transactionDate = new Date(
    formData.get("transactionDate") as string
  );
  const note = formData.get("note") as string | null;

  if (!amount || !type || !transactionDate) {
    throw new Error("ข้อมูลไม่ครบ");
  }

  await prisma.transaction.create({
    data: {
      title,
      amount,
      type,
      transactionDate,
      note,
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function updateTransaction(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const amount = Number(formData.get("amount"));
  const type = formData.get("type") as "INCOME" | "EXPENSE";
  const transactionDate = new Date(
    formData.get("transactionDate") as string
  );
  const note = formData.get("note") as string | null;

  await prisma.transaction.update({
    where: { id },
    data: {
      title,
      amount,
      type,
      transactionDate,
      note,
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function deleteTransaction(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.transaction.delete({
    where: { id },
  });

  revalidatePath("/");
}
