/*
  Warnings:

  - You are about to drop the column `patient_id` on the `patient_history` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `patient_history` DROP FOREIGN KEY `patient_history_patient_id_fkey`;

-- AlterTable
ALTER TABLE `patient_history` DROP COLUMN `patient_id`;

-- AlterTable
ALTER TABLE `patients` ADD COLUMN `patient_history_id` INTEGER NOT NULL DEFAULT 1 AFTER `contact`;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_patient_history_id_fkey` FOREIGN KEY (`patient_history_id`) REFERENCES `patient_history`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
