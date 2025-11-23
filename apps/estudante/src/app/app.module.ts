import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleAsyncProvider, drizzleProvider } from './drizzle/drizzle.provider';
import { CreateEstudanteController } from './useCases/create-estudante.controller';
import { envSchema } from './env';
import { SharedAuthModule } from '../../../../auth/src/lib/auth.module';
import { AuthenticateEstudanteController } from './useCases/authenticate-estudante.controller';
import { GetEstudanteController } from './useCases/get-user.controller';

@Module({
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true,
  }), SharedAuthModule],
  controllers: [CreateEstudanteController, AuthenticateEstudanteController, GetEstudanteController],
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class AppModule {}
