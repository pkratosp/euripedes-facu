import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './infra/env/env.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // TODO: quando finalizar a aplicação habilitar cors

  // configuração do swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('API euripedes')
    .setDescription(
      'Este projeto é para uma instituição sem fins lucrativos devensenvolvida pelos alunos da faculdade unirp',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, documentFactory);

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  await app.listen(port);

  console.log(`servidor rodando em http://localhost:${port}`);
}
bootstrap();
