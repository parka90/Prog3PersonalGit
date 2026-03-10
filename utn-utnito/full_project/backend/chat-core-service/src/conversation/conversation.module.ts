import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationService } from './conversation.service';
import { ConversationEntity } from './entity/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationEntity])],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
