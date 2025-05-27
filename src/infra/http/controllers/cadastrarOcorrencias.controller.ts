import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { TokenPayloadSchemaType } from '@/infra/auth/jwt-strategy';
import { CadastrarOcorrencia } from '@/services/cadastrar-ocorrencia';
import { CadastrarOcorrenciaRequestDto } from '@/services/dto/cadastrar-ocorrencia-dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('ocorrencias')
export class CadastrarOcorrenciasController {
  constructor(private readonly cadastrarOcorrencias: CadastrarOcorrencia) {}

  @Post()
  async handle(
    @Body() data: CadastrarOcorrenciaRequestDto,
    @CurrentUser() user: TokenPayloadSchemaType,
  ) {
    try {
      await this.cadastrarOcorrencias.execute({
        ...data,
        userId: user.sub,
      });
    } catch (error) {
      throw error;
    }
  }
}
