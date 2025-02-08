import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CadastrarAlunoRequestDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  sexo: string;

  @ApiProperty()
  nis: string;

  @ApiProperty()
  dataNascimento: string;

  @ApiProperty()
  rg: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  filiacaoMae: string;

  @ApiProperty()
  pai: string;

  @ApiProperty()
  responsavel: string;

  @ApiProperty()
  rgResponsavel: string;

  @ApiProperty()
  cpfResponsavel: string;

  @ApiProperty()
  naturalidade: string;

  @ApiProperty()
  estado: string;

  @ApiProperty()
  ultimaProcedencia: string;

  @ApiProperty()
  ra: string;

  @ApiProperty()
  escola: string;

  @ApiProperty()
  serieEscola: string;

  @ApiProperty()
  endereco: string;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  contatos: string;

  @ApiPropertyOptional()
  documentos?: string[];
}
