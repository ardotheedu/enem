import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleAsyncProvider, drizzleProvider } from './drizzle/drizzle.provider';
import { CreateEstudanteController } from './useCases/create-estudante.controller';
import { envSchema } from './env';

@Module({
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true,
  })],
  controllers: [CreateEstudanteController],
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class AppModule {}
