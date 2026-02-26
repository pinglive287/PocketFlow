"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; 

function getThailandNow() {
  const now = new Date();
  const thailandOffset = 7 * 60;
  const localOffset = now.getTimezoneOffset();
  const diff = thailandOffset + localOffset;

  return new Date(now.getTime() + diff * 60 * 1000);
}

export async function createTransaction(formData: FormData) {
  const title = formData.get("title") as string;
  const amount = Number(formData.get("amount"));
  const type = formData.get("type") as "INCOME" | "EXPENSE";
  const transactionDateStr = formData.get("transactionDate") as string;
  const note = formData.get("note") as string | null;

  if (!amount || !type || !transactionDateStr) {
    throw new Error("ข้อมูลไม่ครบ");
  }

  const transactionDate = new Date(transactionDateStr);

  if (isNaN(transactionDate.getTime())) {
    throw new Error("วันที่ไม่ถูกต้อง");
  }

  await prisma.transaction.create({
    data: {
      title,
      amount,
      type,
      transactionDate,
      note,
      createdAt: getThailandNow(),
    },
  });

  revalidatePath("/");
  revalidatePath("/transactions/new");
  redirect("/transactions/new");
}

export async function updateTransaction(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const amount = Number(formData.get("amount"));
  const type = formData.get("type") as "INCOME" | "EXPENSE";
  const note = formData.get("note") as string | null;
  const transactionDateStr = formData.get("transactionDate") as string;

  if (!id || !title || !amount || !type || !transactionDateStr) {
    throw new Error("ข้อมูลไม่ครบ");
  }

  const transactionDate = new Date(transactionDateStr);

  if (isNaN(transactionDate.getTime())) {
    throw new Error("วันที่ไม่ถูกต้อง");
  }
  
  await prisma.transaction.update({
    where: { id },
    data: {
      title,
      amount,
      type,
      note,
      transactionDate,
      createdAt: getThailandNow(),
    },
  });

  revalidatePath("/");
  revalidatePath("/transactions/new");
  redirect("/transactions/new");
}

export async function deleteTransaction(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.transaction.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/transactions/new");
}
