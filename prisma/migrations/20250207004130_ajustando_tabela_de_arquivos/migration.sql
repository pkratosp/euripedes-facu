-- DropForeignKey
ALTER TABLE "Documentos" DROP CONSTRAINT "Documentos_idMatricula_fkey";

-- AlterTable
ALTER TABLE "Documentos" ADD COLUMN     "alunoId" TEXT,
ALTER COLUMN "idMatricula" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Documentos" ADD CONSTRAINT "Documentos_idMatricula_fkey" FOREIGN KEY ("idMatricula") REFERENCES "Matriculas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documentos" ADD CONSTRAINT "Documentos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;
