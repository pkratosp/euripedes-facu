import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

@Injectable()
export class EnvService {
  constructor(private readonly confiService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.confiService.get(key, { infer: true });
  }
}
