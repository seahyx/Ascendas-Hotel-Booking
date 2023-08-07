/*
  Warnings:

  - Added the required column `nameTitle` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payeeId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `nameTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `payeeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `roomId` VARCHAR(191) NOT NULL,
    MODIFY `destinationId` VARCHAR(191) NOT NULL,
    MODIFY `hotelId` VARCHAR(191) NOT NULL,
    MODIFY `additionalInfo` LONGTEXT NOT NULL,
    MODIFY `avgRoomCost` DECIMAL(15, 4) NOT NULL,
    MODIFY `roomRate` DECIMAL(15, 4) NOT NULL,
    MODIFY `tax` DECIMAL(15, 4) NOT NULL,
    MODIFY `uid` VARCHAR(191) NOT NULL;
