import { Global, Module } from '@nestjs/common';
import { ConversationModule } from 'src/conversation/conversation.module';
import { MessageModule } from 'src/message/message.module';
import { ChatAppController } from './chat-app.controller';
import { ChatAppService } from './chat-app.service';

@Global()
@Module({
  imports: [ConversationModule, MessageModule],
  controllers: [ChatAppController],
  providers: [ChatAppService],
  exports: [ChatAppService],
})
export class ChatAppModule {}
