/*
  Warnings:

  - You are about to drop the `Ocorrencia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ocorrencia" DROP CONSTRAINT "Ocorrencia_alunoId_fkey";

-- DropTable
DROP TABLE "Ocorrencia";

-- CreateTable
CREATE TABLE "Ocorrencias" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataOcorrencia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alunoId" TEXT NOT NULL,

    CONSTRAINT "Ocorrencias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ocorrencias" ADD CONSTRAINT "Ocorrencias_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
