import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parseValue = this.schema.parse(value);

      return parseValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          mensagem: 'Falhou validação',
          errors: fromZodError(error),
        });
      }

      throw new BadRequestException('Falhou validação');
    }
  }
}
