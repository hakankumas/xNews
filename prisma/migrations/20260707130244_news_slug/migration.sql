/*
  Warnings:

  - Added the required column `slug` to the `news` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `news` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `news` ADD COLUMN `slug` TEXT NOT NULL,
    MODIFY `title` TEXT NOT NULL;
