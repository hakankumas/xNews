/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Opinion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `author` MODIFY `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `news` MODIFY `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `opinion` MODIFY `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `topic` MODIFY `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Author_slug_key` ON `Author`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `News_slug_key` ON `News`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Opinion_slug_key` ON `Opinion`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Topic_slug_key` ON `Topic`(`slug`);
