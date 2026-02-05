/*
  Warnings:

  - Made the column `transaction_time` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "transaction_time" SET NOT NULL,
ALTER COLUMN "transaction_time" SET DEFAULT CURRENT_TIMESTAMP;
