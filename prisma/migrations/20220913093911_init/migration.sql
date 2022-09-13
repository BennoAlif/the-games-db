/*
  Warnings:

  - A unique constraint covering the columns `[imageUrl]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Made the column `imageUrl` on table `game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `game` MODIFY `imageUrl` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Game_imageUrl_key` ON `Game`(`imageUrl`);
