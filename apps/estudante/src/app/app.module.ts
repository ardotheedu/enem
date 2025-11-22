import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleAsyncProvider, drizzleProvider } from './drizzle/drizzle.provider';
import { CreateEstudanteController } from './useCases/create-estudante.controller';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateEstudanteController } from './useCases/authenticate-estudante-controler';

@Module({
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true,
  }), AuthModule],
  controllers: [CreateEstudanteController, AuthenticateEstudanteController],
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class AppModule {}
