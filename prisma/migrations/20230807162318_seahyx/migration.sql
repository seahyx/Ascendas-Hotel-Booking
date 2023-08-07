/*
  Warnings:

  - You are about to drop the column `roomTypes` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `roomType` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `roomTypes`,
    ADD COLUMN `roomType` VARCHAR(191) NOT NULL;
