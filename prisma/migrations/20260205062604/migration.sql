/*
  Warnings:

  - You are about to drop the column `transaction_time` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "transaction_time",
ALTER COLUMN "transaction_date" SET DEFAULT CURRENT_TIMESTAMP;
