-- AlterTable
ALTER TABLE `patients` ADD COLUMN `patient_treatment_id` INTEGER NOT NULL DEFAULT 1 AFTER `contact`;

-- CreateTable
CREATE TABLE `patient_treatments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `patient_treatments_id_key`(`id`),
    UNIQUE INDEX `patient_treatments_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_patient_treatment_id_fkey` FOREIGN KEY (`patient_treatment_id`) REFERENCES `patient_treatments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
