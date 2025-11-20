import {z} from 'zod';

export const envSchema = z.object({
    ESTUDANTE_DATABASE_URL: z.string().url(),
    PORT: z.number().optional().default(3333),
    JWT_SECRET: z.string(),
});

export type Env = z.infer<typeof envSchema>;