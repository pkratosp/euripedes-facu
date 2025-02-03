-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataOcorrencia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alunoId" TEXT NOT NULL,

    CONSTRAINT "Ocorrencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matriculas" (
    "id" TEXT NOT NULL,
    "atendido" TEXT NOT NULL,
    "telefoneMae" TEXT NOT NULL,
    "telefonePai" TEXT,
    "telefoneRecado" TEXT,
    "responsavelLegal" TEXT NOT NULL,
    "anoMatricula" INTEGER NOT NULL,
    "alunoId" TEXT NOT NULL,

    CONSTRAINT "Matriculas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perguntas" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "matriculaId" TEXT NOT NULL,

    CONSTRAINT "Perguntas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respostas" (
    "id" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "perguntasId" TEXT,

    CONSTRAINT "Respostas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matriculas" ADD CONSTRAINT "Matriculas_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perguntas" ADD CONSTRAINT "Perguntas_matriculaId_fkey" FOREIGN KEY ("matriculaId") REFERENCES "Matriculas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respostas" ADD CONSTRAINT "Respostas_perguntasId_fkey" FOREIGN KEY ("perguntasId") REFERENCES "Perguntas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
