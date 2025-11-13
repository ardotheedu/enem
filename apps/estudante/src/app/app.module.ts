import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleAsyncProvider, drizzleProvider } from './drizzle/drizzle.provider';
import { CreateEstudanteController } from './useCases/create-estudante.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CreateEstudanteController],
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class AppModule {}
