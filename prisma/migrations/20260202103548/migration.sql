/*
  Warnings:

  - You are about to drop the column `createdAt` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transactionDate` on the `transactions` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `transaction_date` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "createdAt",
DROP COLUMN "transactionDate",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transaction_date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);
