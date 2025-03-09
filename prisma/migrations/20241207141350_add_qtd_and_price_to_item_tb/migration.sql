-- AlterTable
ALTER TABLE `items` ADD COLUMN `price` DECIMAL(10, 2) NOT NULL DEFAULT 1 AFTER `description`,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 1 AFTER `price`;
