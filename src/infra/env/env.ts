import { z } from 'zod';

export const envSchema = z.object({
  POSTGRESQL_DATABASE: z.string(),
  POSTGRESQL_PASSWORD: z.coerce.number(),
  POSTGRESQL_USERNAME: z.string(),
  POSTGRESQL_PORT_NUMBER: z.coerce.number(),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
