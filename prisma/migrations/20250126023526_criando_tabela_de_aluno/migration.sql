-- CreateTable
CREATE TABLE "Aluno" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "filiacaoMae" TEXT NOT NULL,
    "pai" TEXT,
    "responsavel" TEXT NOT NULL,
    "rgResponsavel" TEXT NOT NULL,
    "cpfResponsavel" TEXT NOT NULL,
    "naturalidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "ultimaProcedencia" TEXT NOT NULL,
    "ra" TEXT NOT NULL,
    "escola" TEXT NOT NULL,
    "serieEscola" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "contatos" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_rg_key" ON "Aluno"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_cpf_key" ON "Aluno"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_ra_key" ON "Aluno"("ra");
