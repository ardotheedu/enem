import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleAsyncProvider, drizzleProvider } from './drizzle/drizzle.provider';
import { CreateEstudanteController } from './useCases/create-estudante.controller';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true,
  }), AuthModule],
  controllers: [CreateEstudanteController],
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class AppModule {}
