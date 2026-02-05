/*
  Warnings:

  - The `transaction_time` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "transaction_time",
ADD COLUMN     "transaction_time" TIMESTAMP(3);
