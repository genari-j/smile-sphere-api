/*
  Warnings:

  - A unique constraint covering the columns `[user_code]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `doctors_user_code_key` ON `doctors`(`user_code`);
