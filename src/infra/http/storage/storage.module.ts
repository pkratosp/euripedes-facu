import { EnvModule } from '@/infra/env/env.module';
import { Uploader } from '@/repositories/repository-storage';
import { Module } from '@nestjs/common';
import { R2Storage } from './r2-storage';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: R2Storage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
