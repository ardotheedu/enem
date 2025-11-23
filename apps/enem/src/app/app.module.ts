import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedAuthModule } from '@enem/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
