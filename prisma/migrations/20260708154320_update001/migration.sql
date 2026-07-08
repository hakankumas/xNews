-- AlterTable
ALTER TABLE `news` ADD COLUMN `description` VARCHAR(500) NULL,
    ADD COLUMN `seo_description` VARCHAR(500) NULL,
    ADD COLUMN `seo_title` VARCHAR(255) NULL,
    MODIFY `title` VARCHAR(255) NOT NULL;
