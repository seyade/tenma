/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expiredAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Session_id_seq";
