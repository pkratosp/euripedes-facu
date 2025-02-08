import { Module } from '@nestjs/common';
import { EnvModule } from './infra/env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './infra/env/env';
import { HttpModule } from './infra/http/http.module';
import { AuthModule } from './infra/auth/auth.module';
import { TesteModule } from './teste/teste.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    HttpModule,
    AuthModule,
    TesteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
