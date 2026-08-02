/*
  Warnings:

  - Made the column `goal_time` on table `goals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `goals` MODIFY `goal_time` INTEGER NOT NULL;
