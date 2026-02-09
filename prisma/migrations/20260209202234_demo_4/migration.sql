/*
  Warnings:

  - You are about to alter the column `scheduled_at` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `completed_at` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `accepted_at` on the `consents` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `valid_from` on the `coupons` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `valid_until` on the `coupons` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `paid_at` on the `debts` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `filled_at` on the `questionnaires` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `revoked_at` on the `revokes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `bookings` MODIFY `scheduled_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `carts` MODIFY `completed_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `consents` MODIFY `accepted_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `coupons` MODIFY `valid_from` DATETIME NULL,
    MODIFY `valid_until` DATETIME NULL;

-- AlterTable
ALTER TABLE `debts` MODIFY `paid_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `questionnaires` MODIFY `filled_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `revokes` MODIFY `revoked_at` DATETIME NULL;
