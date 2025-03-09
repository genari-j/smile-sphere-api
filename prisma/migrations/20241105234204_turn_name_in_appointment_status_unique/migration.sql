/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `appointments_status` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `appointments_status_name_key` ON `appointments_status`(`name`);
