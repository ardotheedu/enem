import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleAsyncProvider, drizzleProvider } from './database/drizzle/drizzle.provider';
import { envSchema } from './env';
import { SharedAuthModule } from '@enem/auth';
import { HttpModule } from './controllers/http.module';


@Module({
  imports: [ConfigModule.forRoot({
    validate: env => envSchema.parse(env),
    isGlobal: true,
  }), SharedAuthModule, HttpModule],
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class AppModule {}
