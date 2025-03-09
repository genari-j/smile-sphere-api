/*
  Warnings:

  - You are about to drop the column `address_type_id` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the `addresses_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_address_type_id_fkey`;

-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `address_type_id`;

-- DropTable
DROP TABLE `addresses_type`;
