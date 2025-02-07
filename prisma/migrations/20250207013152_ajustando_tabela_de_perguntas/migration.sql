/*
  Warnings:

  - You are about to drop the column `matriculaId` on the `Perguntas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Perguntas" DROP CONSTRAINT "Perguntas_matriculaId_fkey";

-- AlterTable
ALTER TABLE "Perguntas" DROP COLUMN "matriculaId";

-- AlterTable
ALTER TABLE "Respostas" ADD COLUMN     "matriculasId" TEXT;

-- AddForeignKey
ALTER TABLE "Respostas" ADD CONSTRAINT "Respostas_matriculasId_fkey" FOREIGN KEY ("matriculasId") REFERENCES "Matriculas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
