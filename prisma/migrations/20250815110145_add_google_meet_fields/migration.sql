/*
  Warnings:

  - You are about to drop the column `videoSessionId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `videoSessionToken` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "videoSessionId",
DROP COLUMN "videoSessionToken",
ADD COLUMN     "calendarId" TEXT,
ADD COLUMN     "googleEventId" TEXT,
ADD COLUMN     "googleMeetLink" TEXT;
