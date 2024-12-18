/*
  Warnings:

  - You are about to drop the column `crimeDescription` on the `crimes` table. All the data in the column will be lost.
  - Added the required column `crime_description` to the `crimes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "crimes" DROP COLUMN "crimeDescription",
ADD COLUMN     "crime_description" VARCHAR(255) NOT NULL;
