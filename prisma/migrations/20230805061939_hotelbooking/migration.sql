/*
  Warnings:

  - You are about to drop the column `bookingInfoId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `guestInfoId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `payeeInfoId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the `bookingdisplayinformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `guestinformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payeeinformation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adults` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avgRoomCost` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `children` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageToHotel` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfNights` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfRooms` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomRate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomTypes` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_bookingInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_guestInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_payeeInfoId_fkey`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `bookingInfoId`,
    DROP COLUMN `guestInfoId`,
    DROP COLUMN `payeeInfoId`,
    ADD COLUMN `adults` INTEGER NOT NULL,
    ADD COLUMN `avgRoomCost` DOUBLE NOT NULL,
    ADD COLUMN `children` INTEGER NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `messageToHotel` VARCHAR(191) NOT NULL,
    ADD COLUMN `numberOfNights` INTEGER NOT NULL,
    ADD COLUMN `numberOfRooms` INTEGER NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `roomRate` DOUBLE NOT NULL,
    ADD COLUMN `roomTypes` VARCHAR(191) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `tax` DOUBLE NOT NULL,
    ADD COLUMN `uid` INTEGER NOT NULL;

-- DropTable
DROP TABLE `BookingDisplayInformation`;

-- DropTable
DROP TABLE `GuestInformation`;

-- DropTable
DROP TABLE `PayeeInformation`;
