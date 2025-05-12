/*
  Warnings:

  - You are about to alter the column `price` on the `games` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `rating` on the `games` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,1)` to `Double`.

*/
-- AlterTable
ALTER TABLE `games` MODIFY `price` DOUBLE NULL,
    MODIFY `rating` DOUBLE NULL;
