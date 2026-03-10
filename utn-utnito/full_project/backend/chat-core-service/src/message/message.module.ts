import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiModule } from 'src/ai/ai.module';
import { MessageEntity } from './entity/message.entity';
import { MessageService } from './message.service';
import { ConversationModule } from 'src/conversation/conversation.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), ConversationModule, AiModule],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
