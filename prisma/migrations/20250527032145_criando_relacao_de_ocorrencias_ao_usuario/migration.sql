/*
  Warnings:

  - Added the required column `userId` to the `Ocorrencias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ocorrencias" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ocorrencias" ADD CONSTRAINT "Ocorrencias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
