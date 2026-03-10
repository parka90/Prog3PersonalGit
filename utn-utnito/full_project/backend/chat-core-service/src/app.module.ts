import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { AllExceptionsFilter } from './basic/all-exceptions.filter';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { AiModule } from './ai/ai.module';
import { ChatAppModule } from './chat-app/chat-app.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env',
    }),
    HttpModule,
    DatabaseModule,
    HealthModule,
    AuthModule,
    AiModule,
    ConversationModule,
    ChatAppModule,
    MessageModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
