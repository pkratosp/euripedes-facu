-- CreateEnum
CREATE TYPE "TipoDocumento" AS ENUM ('Aluno', 'Matricula');

-- CreateTable
CREATE TABLE "Documentos" (
    "id" TEXT NOT NULL,
    "nomeArquivo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "idMatricula" TEXT NOT NULL,

    CONSTRAINT "Documentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Documentos_url_key" ON "Documentos"("url");

-- AddForeignKey
ALTER TABLE "Documentos" ADD CONSTRAINT "Documentos_idMatricula_fkey" FOREIGN KEY ("idMatricula") REFERENCES "Matriculas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
