/*
  Warnings:

  - Added the required column `slug` to the `author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `author` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `img` TEXT NULL,
    ADD COLUMN `slug` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `news` ADD COLUMN `img` TEXT NULL;

-- AlterTable
ALTER TABLE `topic` ADD COLUMN `img` TEXT NULL,
    ADD COLUMN `slug` TEXT NOT NULL;
