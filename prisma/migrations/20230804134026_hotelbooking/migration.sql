-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `destinationId` INTEGER NOT NULL,
    `hotelId` INTEGER NOT NULL,
    `bookingInfoId` INTEGER NOT NULL,
    `guestInfoId` INTEGER NOT NULL,
    `payeeInfoId` INTEGER NOT NULL,
    `additionalInfo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingDisplayInformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numberOfNights` INTEGER NOT NULL,
    `numberOfRooms` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `adults` INTEGER NOT NULL,
    `children` INTEGER NOT NULL,
    `messageToHotel` VARCHAR(191) NOT NULL,
    `roomTypes` VARCHAR(191) NOT NULL,
    `avgRoomCost` DOUBLE NOT NULL,
    `roomRate` DOUBLE NOT NULL,
    `tax` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GuestInformation` (
    `id` INTEGER NOT NULL,
    `uid` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PayeeInformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_bookingInfoId_fkey` FOREIGN KEY (`bookingInfoId`) REFERENCES `BookingDisplayInformation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_guestInfoId_fkey` FOREIGN KEY (`guestInfoId`) REFERENCES `GuestInformation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_payeeInfoId_fkey` FOREIGN KEY (`payeeInfoId`) REFERENCES `PayeeInformation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
